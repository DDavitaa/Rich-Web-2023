// importing necessary modules and components
import React, { useEffect, useRef } from 'react';


const YouTubePlayer = ({ videoId, setPlayer, shouldPlay, style }) => {
    // ref for the YouTube player
    const playerRef = useRef(null);

    // effect hook for creating a YouTube player
    useEffect(() => {
        // ensure the YouTube IFrame API script is loaded
        if (!window.YT) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(script);
        }

        // wait for the YouTube IFrame API script to load
        const interval = setInterval(() => {
        if (window.YT && window.YT.Player) {
            clearInterval(interval);

            // create a new player
            new window.YT.Player(playerRef.current, {
            videoId: videoId,
            width: '350px',
            height: '200px',
            playerVars: {
                controls: 0,
                enablejsapi: 1,
                modestbranding: 1,
                rel: 0,
                autohide: 1
            },
            events: {
                onReady: (event) => { // Set the player when it's ready
                    setPlayer(event.target); // Set the player
                    if (shouldPlay) { // Play the video if it should play
                        event.target.playVideo(); // Play the video
                    }
                },
            },
            });
        }
        }, 100);

        return () => {
            clearInterval(interval); // Clear the interval
        };
    }, [videoId, setPlayer, shouldPlay]);

    // render the YouTube player
    return <div ref={playerRef} style={style} className='player' />;
};

export default YouTubePlayer;