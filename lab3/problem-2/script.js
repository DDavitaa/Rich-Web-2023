// Set the countdown time in seconds
const countdownTimeInSeconds = 500; // 1 hour

// Create an Observable that emits a value every second
const countdown$ = rxjs.interval(1000).pipe(
    rxjs.map(i => countdownTimeInSeconds - i),
    rxjs.take(countdownTimeInSeconds + 1)
);

// Subscribe to the Observable to update the countdown timer
countdown$.subscribe(secondsLeft => {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    console.log(`Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);
});