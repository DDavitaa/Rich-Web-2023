// importing necessary modules and components
import React, { useState, useEffect, useRef } from 'react';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Jokes component receives props from the App component
const Jokes = ({ player, setShowPlayer }) => {
    // state for storing the joke data
    const [data, setData] = useState(null);

    // state for controlling the visibility of the punchline
    const [click, setClick] = useState(0);

    // state for controlling the visibility of the punchline
    const [showPunchline, setShowPunchline] = useState(false);

    // ref for the cancel fetch subject
    const cancelFetch$ = useRef(new Subject());

    // effect hook for fetching a joke
    useEffect(() => {
        // don't show the punchline
        setShowPunchline(false);

        from(fetch('https://official-joke-api.appspot.com/random_joke')) // Fetch a random joke
        .pipe(takeUntil(cancelFetch$.current)) // Cancel the fetch when the component unmounts
        .subscribe( 
            async response => {
            const data = await response.json();
            setData(data); // Update the joke data
            },
            error => console.error(error)
        );
        
        // variable for storing the current cancel fetch subject
        const currentCancelFetch = cancelFetch$.current;

        return () => {
            // next the current cancel fetch subject
            currentCancelFetch.next();
        };
    }, [click]);

    // function for randomizing a joke
    const handleRandomizeClick = () => {
        // increment the click count
        setClick(click + 1);

        // stop the YouTube player
        if (player) {
            player.stopVideo();
        }
    };

    const handlePunchlineClick = () => {
        // show the punchline
        setShowPunchline(true);

        // show the YouTube player
        setShowPlayer(true);

        // play the YouTube player
        if (player) {
            player.playVideo();
        }
        
    };

    // render the joke
    return (
        <div className='joke'>
            {data ? ( // If the joke data exists, render the joke
                <div className='joke-container'>
                    <div className='joke-setup'><b>Joke:</b> {data.setup}</div> {/* Render the joke setup */}
                    {showPunchline && <div className='joke-punchline'><b>A:</b> {data.punchline}</div>} {/* Render the joke punchline */}
                </div>
            ) : ( // Otherwise, render a loading message
                <div className='joke-container'>Loading Joke...</div>
            )}
            <button className='joke-btn' onClick={handlePunchlineClick}>Show Punchline</button> {/* Show the punchline */}
            <button className='joke-btn' onClick={handleRandomizeClick}>Randomize Joke</button> {/* Randomize the joke */}
            
        </div>
    );
};

export default Jokes;