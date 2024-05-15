import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [targetDate, setTargetDate] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const startCountdown = () => {
    const countdownDate = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance > 0) {
      setRemainingTime(distance);
      const id = setInterval(() => {
        const currentTime = new Date().getTime();
        const newDistance = countdownDate - currentTime;
        if (newDistance > 0) {
          setRemainingTime(newDistance);
        } else {
          clearInterval(timerId);
          setRemainingTime(0);
        }
      }, 1000);
      setTimerId(id);
    }
  };

  const stopCountdown = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const resetCountdown = () => {
    clearInterval(timerId);
    setRemainingTime(0);
    setTargetDate('');
    setTimerId(null);
  };

  useEffect(() => {
    return () => clearInterval(timerId);
  }, [timerId]);

  return (
    <div  style={{ display: 'flex', flexDirection: 'column' }}   className="countdown-timer">
      <div><h2>Countdown Timer</h2></div>
     <div><input
        type="datetime-local"
        value={targetDate}
        min={getMinDateTime()}
        max={getMaxDateTime()}
        onChange={(e) => setTargetDate(e.target.value)}
      />
      <button onClick={startCountdown}>Start</button>
      <button onClick={stopCountdown}>Stop</button>
      <button onClick={resetCountdown}>Reset</button>
      <div>{formatTime(remainingTime)}</div></div>
    </div>
  );
};

const formatTime = (time) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const getMinDateTime = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().slice(0, 16);
};

const getMaxDateTime = () => {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 99);
  return maxDate.toISOString().slice(0, 16);
};

export default Timer;
