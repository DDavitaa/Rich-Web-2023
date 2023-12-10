import React, { useState, useEffect, useRef } from 'react';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const Jokes = () => {
  const [data, setData] = useState(null);
  const [click, setClick] = useState(0);
  const cancelFetch$ = useRef(new Subject());

  useEffect(() => {
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

  const handleClick = () => {
    setClick(click + 1);
  };

  return (
    <div>
      {data ? (
        <div>{data.setup}</div>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={handleClick}>Randomize Joke</button>
    </div>
  );
};

export default Jokes;