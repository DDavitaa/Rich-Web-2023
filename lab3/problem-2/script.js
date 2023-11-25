
// get DOM elements
const start_btn = document.getElementById("start");
const pause_resume_btn = document.getElementById("pause_resume");
const hour_input = document.getElementById("hours");
const min_input = document.getElementById("minutes");
const sec_input = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const video = document.getElementById("alarm");

// create observables from click events
const start$ = rxjs.fromEvent(start_btn, "click");
const pauseResume$ = rxjs.fromEvent(pause_resume_btn, "click");

// array of input fields
const inputs = [hour_input, min_input, sec_input];

// prevents entry of - and . in the input fields
inputs.forEach(input => {
    rxjs.fromEvent(input, 'input').subscribe((event) => {
        event.target.value = event.target.value.replace(/[-.]/g, '');
    });
});

// BehaviourSubject to keep track of whether the timer is paused or not
const isPaused$ = new rxjs.BehaviorSubject(false);

// subscribe to isPaused$ to change the text of the pause/resume button
isPaused$.subscribe(() => {
    pause_resume_btn.innerHTML = isPaused$.value ? "&#9658; RESUME" : "&#9612;&#9612; PAUSE";
});

// subscribe to pauseResume$ to toggle the value of isPaused$
pauseResume$.subscribe(() => {
    isPaused$.next(!isPaused$.value);
});

// variables to keep track of the elapsed time and whether the timer is running
let isRunning = false;
let elapsedSeconds = 0;

// subscribe to start$ to start the timer
start$.pipe(
    // when tapped, set isPaused$ to false and isRunning to true
    rxjs.tap(() => {
        isPaused$.next(false);
        isRunning = true;
    }),
    // switchMap to a new observable that emits the remaining seconds
    rxjs.switchMap(() => {
        elapsedSeconds = 0;

        // create observables from the input fields
        const sec$ = rxjs.fromEvent(sec_input, "input").pipe(
            // if the timer is running, ignore the input event 
            rxjs.filter(() => !isRunning),
            // convert the value of the input field to number
            rxjs.map(event => Number(event.target.value)),
            // start with the current value of the input field
            rxjs.startWith(sec_input.value ? Number(sec_input.value) : 0)
        );

        // same as above except it subscribes to the sec$ observable
        const min$ = sec$.pipe(
            rxjs.switchMap(() => rxjs.fromEvent(min_input, "input").pipe(
                rxjs.filter(() => !isRunning),
                rxjs.map(event => Number(event.target.value)),
                rxjs.startWith(min_input.value ? Number(min_input.value) : 0)
            ))
        );

        // same as above except it subscribes to the min$ observable
        const hour$ = min$.pipe(
            rxjs.switchMap(() => rxjs.fromEvent(hour_input, "input").pipe(
                rxjs.filter(() => !isRunning),
                rxjs.map(event => Number(event.target.value)),
                rxjs.startWith(hour_input.value ? Number(hour_input.value) : 0)
            ))
        );

        // combine the three observables into one
        const countdownTime$ = rxjs.combineLatest([hour$, min$, sec$]).pipe(
            rxjs.map(([hours, minutes, seconds]) => hours * 3600 + minutes * 60 + seconds + 1)
        );

        // create an observable that emits every second
        const countdown$ = countdownTime$.pipe(
            rxjs.switchMap(totalSeconds => {
                // return an observable that emits the remaining seconds
                return rxjs.interval(1000).pipe(
                    // start with the total seconds
                    rxjs.startWith(totalSeconds),
                    // if the timer is paused, ignore the interval event
                    rxjs.filter(() => !isPaused$.value),
                    // map the interval event to the remaining seconds
                    rxjs.map(i => {
                        elapsedSeconds++;
                        return totalSeconds - elapsedSeconds;
                    }),
                    // take the first totalSeconds number of events
                    rxjs.take(totalSeconds),
                    // takeUntil the start$ event
                    rxjs.takeUntil(start$)
                );
            })
        );
        
        // return the countdown$ observable
        return countdown$;
        
    }))
    // subscribe to the countdown$ observable
    .subscribe(remainingSeconds => {
        // convert the remaining seconds to hours, minutes and seconds
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        // display 0 in front of the number if it is less than 10
        const hours_show = hours < 10 ? `0${hours}` : `${hours}`;
        const mins_show = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secs_show = seconds < 10 ? `0${seconds}` : `${seconds}`;

        // display the time
        countdown.innerHTML = `${hours_show}:${mins_show}:${secs_show}`;

        // if the remaining seconds is 0, display the video and play it
        if (remainingSeconds <= 0) {
            video.style.display = "block";
            player.playVideo();
        }
        else { // otherwise, hide the video
            video.style.display = "none";
        }
    }
);

// create a variable
let player;

// function to create a YouTube player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube_video', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

// function that is called when the player is ready
function onPlayerReady(event) {

}
