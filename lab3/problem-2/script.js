const start_btn = document.getElementById("start");
const pause_resume_btn = document.getElementById("pause_resume");
const hour_input = document.getElementById("hours");
const min_input = document.getElementById("minutes");
const sec_input = document.getElementById("seconds");

const start$ = rxjs.fromEvent(start_btn, "click");
const pauseResume$ = rxjs.fromEvent(pause_resume_btn, "click");

const isPaused$ = new rxjs.BehaviorSubject(false);
let elapsedSeconds = 0;

pauseResume$.subscribe(() => {
    isPaused$.next(!isPaused$.value);
});

start$.pipe(
    rxjs.switchMap(() => {
        elapsedSeconds = 0;
        const hour$ = rxjs.fromEvent(hour_input, "input").pipe(
            rxjs.map(event => Number(event.target.value)),
            rxjs.startWith(hour_input.value ? Number(hour_input.value) : 0)
        );

        const min$ = hour$.pipe(
            rxjs.switchMap(() => rxjs.fromEvent(min_input, "input").pipe(
                rxjs.map(event => Number(event.target.value)),
                rxjs.startWith(min_input.value ? Number(min_input.value) : 0)
            ))
        );

        const sec$ = min$.pipe(
            rxjs.switchMap(() => rxjs.fromEvent(sec_input, "input").pipe(
                rxjs.map(event => Number(event.target.value)),
                rxjs.startWith(sec_input.value ? Number(sec_input.value) : 0)
            ))
        );

        const countdownTime$ = rxjs.combineLatest([hour$, min$, sec$]).pipe(
            rxjs.map(([hours, minutes, seconds]) => hours * 3600 + minutes * 60 + seconds)
        );

        const countdown$ = countdownTime$.pipe(
            rxjs.switchMap(totalSeconds => {
                return rxjs.interval(1000).pipe(
                    rxjs.filter(() => !isPaused$.value),
                    rxjs.map(i => {
                        elapsedSeconds++;
                        return totalSeconds - elapsedSeconds;
                    }),
                    rxjs.take(totalSeconds + 1),
                    rxjs.takeUntil(start$)
                );
            })
        );

        return countdown$;
    })
).subscribe(remainingSeconds => {
    console.log(remainingSeconds);
});