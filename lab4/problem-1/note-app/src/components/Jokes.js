import React, { useState, useEffect, useRef } from 'react';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const Jokes = () => {
    const [data, setData] = useState(null);
    const [click, setClick] = useState(0);
    const [showPunchline, setShowPunchline] = useState(false);
    const cancelFetch$ = useRef(new Subject());

    useEffect(() => {
        setShowPunchline(false);
        from(fetch('https://official-joke-api.appspot.com/random_joke'))
        .pipe(takeUntil(cancelFetch$.current))
        .subscribe(
            async response => {
            const data = await response.json();
            setData(data);
            },
            error => console.error(error)
        );

        return () => {
        cancelFetch$.current.next();
        };
    }, [click]);

    const handleRandomizeClick = () => {
        setClick(click + 1);
    };

    const handlePunchlineClick = () => {
        setShowPunchline(true);
    };

    return (
        <div>
        {data ? (
            <div>
            <div>{data.setup}</div>
            {showPunchline && <div>{data.punchline}</div>}
            <button onClick={handlePunchlineClick}>Show Punchline</button>
            </div>
        ) : (
            <div>Loading...</div>
        )}
        <button onClick={handleRandomizeClick}>Randomize Joke</button>
        </div>
    );
};

export default Jokes;