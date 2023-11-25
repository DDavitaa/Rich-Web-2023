
const hour_input = document.getElementById("hours");
const min_input = document.getElementById("minutes");
const sec_input = document.getElementById("seconds");

const start_btn = document.getElementById("start");
const pause_resume_btn = document.getElementById("pause_resume");

const countdown = document.getElementById("countdown");

const inputs = [hour_input, min_input, sec_input];

// prevents entry of - and . in the input fields
inputs.forEach(input => {
    rxjs.fromEvent(input, 'input').subscribe((event) => {
        event.target.value = event.target.value.replace(/[-.]/g, '');
    });
});

const hour$ = rxjs.fromEvent(hour_input, "input").pipe(
    rxjs.map(event => Number(event.target.value))
);
const min$ = rxjs.fromEvent(min_input, "input").pipe(
    rxjs.map(event => Number(event.target.value))
);
const sec$ = rxjs.fromEvent(sec_input, "input").pipe(
    rxjs.map(event => Number(event.target.value))
);

const start$ = rxjs.fromEvent(start_btn, "click");
const pause_resume$ = rxjs.fromEvent(pause_resume_btn, "click");

const countdownTimeInSeconds = 300;

const seconds$ = rxjs.interval(1000).pipe(
    rxjs.map(i => countdownTimeInSeconds - i),
    rxjs.take(countdownTimeInSeconds + 1)
    //rxjs.takeUntil(pause_resume$)
);

const minutes$ = seconds$.pipe(
    rxjs.map(seconds => Math.floor(seconds / 60))
);

const hours$ = minutes$.pipe(
    rxjs.map(minutes => Math.floor(minutes / 60))
);



hours$.subscribe(hours => {
    const hours_show = hours < 10 ? `0${hours}` : `${hours}`;

    countdown.innerHTML = `${hours_show}:`;
});

minutes$.subscribe(minutes => {
    const mins_format = minutes % 60;
    const mins_show = mins_format < 10 ? `0${mins_format}` : `${mins_format}`;

    countdown.innerHTML += `${mins_show}:`;
});

seconds$.subscribe(seconds => {
    const secs_format = seconds % 60;
    const secs_show = secs_format < 10 ? `0${secs_format}` : `${secs_format}`;

    countdown.innerHTML += `${secs_show}`;
});
