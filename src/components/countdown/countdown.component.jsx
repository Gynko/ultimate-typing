import React, { useState, useEffect } from "react";
import "./countdown.styles.css";

export default function Countdown() {
  const [timer, setTimer] = useState(3);
  const [containerOpacity, setContainerOpacity] = useState(1);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      // When timer reaches 0, start fading out the container
      const opacityInterval = setInterval(() => {
        if (containerOpacity > 0) {
          setContainerOpacity((prevOpacity) => prevOpacity - 0.01);
        } else {
          clearInterval(opacityInterval);
        }
      }, 10); // Adjust the interval time as needed for smoother animation
    }
  }, [timer, containerOpacity]);

  return (
    <div
      className={`countdown-container countdown-${timer}`}
      style={{
        opacity: containerOpacity,
        transition: "opacity 0.5s ease", // Smooth fade-out transition
        display: timer === 0 && containerOpacity === 0 ? "none" : "flex", // Hide the container when timer is 0 and opacity is 0
      }}
    >
      <p className="countdown">{timer}</p>
    </div>
  );
}
