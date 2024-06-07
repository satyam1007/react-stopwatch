import React, { useState, useRef, useEffect } from "react";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const IntervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      IntervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(IntervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliSeconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliSeconds = String(milliSeconds).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds} : ${milliSeconds}`;
  }

  return (
    <div className="stopWatch flex justify-center items-center h-screen bg-gradient-to-bl from-black flex-col gap-2">
      <div className="display text-4xl drop-shadow-lg text-white">
        {formatTime()}
      </div>
      <div className="control">
        <button
          onClick={start}
          className="bg-gradient-to-br from-green-500 to-blue-500 text-white px-4 py-1 rounded text-xl m-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold"
        >
          Start
        </button>
        <button
          onClick={stop}
          className="bg-gradient-to-t from-pink-500 to-indigo-500 text-white px-4 py-1 rounded text-xl m-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold"
        >
          Stop
        </button>
        <button
          onClick={reset}
          className="bg-gradient-to-tr from-red-700 to-yellow-500 text-white px-4 py-1 rounded text-xl m-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
