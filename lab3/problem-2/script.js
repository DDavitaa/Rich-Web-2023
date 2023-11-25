const start_btn = document.getElementById("start");
const pause_resume_btn = document.getElementById("pause_resume");
const hour_input = document.getElementById("hours");
const min_input = document.getElementById("minutes");
const sec_input = document.getElementById("seconds");
const countdown = document.getElementById("countdown");

const start$ = rxjs.fromEvent(start_btn, "click");
const pauseResume$ = rxjs.fromEvent(pause_resume_btn, "click");

const inputs = [hour_input, min_input, sec_input];

// prevents entry of - and . in the input fields
inputs.forEach(input => {
    rxjs.fromEvent(input, 'input').subscribe((event) => {
        event.target.value = event.target.value.replace(/[-.]/g, '');
    });
});

const isPaused$ = new rxjs.BehaviorSubject(false);


isPaused$.subscribe(() => {
    pause_resume_btn.innerHTML = isPaused$.value ? "&#9658; RESUME" : "&#9612;&#9612; PAUSE";
});

pauseResume$.subscribe(() => {
    
    isPaused$.next(!isPaused$.value);
});

let elapsedSeconds = 0;
let isRunning = false;

start$.pipe(
    rxjs.tap(() => {
        isPaused$.next(false);
        isRunning = true;
    }),
    rxjs.switchMap(() => {
        elapsedSeconds = 0;
        const sec$ = rxjs.fromEvent(sec_input, "input").pipe(
            rxjs.filter(() => !isRunning),
            rxjs.map(event => Number(event.target.value)),
            rxjs.startWith(sec_input.value ? Number(sec_input.value) : 0)
        );

        const min$ = sec$.pipe(
            rxjs.switchMap(() => rxjs.fromEvent(min_input, "input").pipe(
                rxjs.filter(() => !isRunning),
                rxjs.map(event => Number(event.target.value)),
                rxjs.startWith(min_input.value ? Number(min_input.value) : 0)
            ))
        );

        const hour$ = min$.pipe(
            rxjs.switchMap(() => rxjs.fromEvent(hour_input, "input").pipe(
                rxjs.filter(() => !isRunning),
                rxjs.map(event => Number(event.target.value)),
                rxjs.startWith(hour_input.value ? Number(hour_input.value) : 0)
            ))
        );

        const countdownTime$ = rxjs.combineLatest([hour$, min$, sec$]).pipe(
            rxjs.map(([hours, minutes, seconds]) => hours * 3600 + minutes * 60 + seconds + 1)
        );

        const countdown$ = countdownTime$.pipe(
            rxjs.switchMap(totalSeconds => {
                return rxjs.interval(1000).pipe(
                    rxjs.startWith(totalSeconds),
                    rxjs.filter(() => !isPaused$.value),
                    rxjs.map(i => {
                        elapsedSeconds++;
                        return totalSeconds - elapsedSeconds;
                    }),
                    rxjs.take(totalSeconds),
                    rxjs.takeUntil(start$)
                );
            })
        );

        return countdown$;
    })
).subscribe(remainingSeconds => {
    if (remainingSeconds <= 0) {
        isRunning = false;
    }

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    const hours_show = hours < 10 ? `0${hours}` : `${hours}`;
    const mins_show = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secs_show = seconds < 10 ? `0${seconds}` : `${seconds}`;

    countdown.innerHTML = `${hours_show}:${mins_show}:${secs_show}`;
});