import React, { useEffect, useRef } from 'react';

const YouTubePlayer = ({ videoId, setPlayer, shouldPlay, style }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Ensure the YouTube IFrame API script is loaded
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }

    // Wait for the YouTube IFrame API script to load
    const interval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(interval);

        // Create a new player
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
            onReady: (event) => {
                setPlayer(event.target);
                if (shouldPlay) {
                    event.target.playVideo();
                }
            },
          },
        });
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [videoId, setPlayer, shouldPlay]);

  return <div ref={playerRef} style={style} className='player'/>;
};

export default YouTubePlayer;