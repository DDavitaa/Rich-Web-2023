import React, { useState, useEffect, useRef } from 'react';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Jokes component
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
        <div className='joke'>
            {data ? (
                <div className='joke-container'>
                    <div className='joke-setup'><b>Joke:</b> {data.setup}</div>
                    {showPunchline && <div className='joke-punchline'><b>A:</b> {data.punchline}</div>}
                    
                </div>
            ) : (
                <div className='loading'>Loading...</div>
            )}
            <button className='joke-btn' onClick={handlePunchlineClick}>Show Punchline</button>
            <button className='joke-btn' onClick={handleRandomizeClick}>Randomize Joke</button>
        </div>
    );
};

export default Jokes;