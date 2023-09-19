import React, { useState, useEffect } from "react";
import "./countdown.styles.css";

export default function Countdown() {
  const [timer, setTimer] = useState(3);
  const [containerOpacity, setContainerOpacity] = useState(1);
  const [showInstruction, setShowInstruction] = useState(true); // New state variable

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
      const opacityInterval = setInterval(() => {
        if (containerOpacity > 0) {
          setContainerOpacity((prevOpacity) => prevOpacity - 0.01);
          setShowInstruction(false); // Hide the instruction
        } else {
          clearInterval(opacityInterval);
        }
      }, 10);
    }
  }, [timer, containerOpacity]);

  return (
    <div className="countdown-container-all">
      <div
        className={`countdown-container countdown-${timer}`}
        style={{
          opacity: containerOpacity,
          transition: "opacity 0.5s ease",
          display: timer === 0 && containerOpacity === 0 ? "none" : "flex",
        }}
      >
        <p className="countdown">{timer !== 0 ? timer : "GO!"}</p>
      </div>
      {showInstruction && (
        <h1
          style={{
            opacity: containerOpacity,
            transition: "opacity 0.5s ease",
            textAlign: "center",
            fontFamily: "var(--font-text)",
          }}
        >
          Press Spacebar when you are finished typing a word
        </h1>
      )}
    </div>
  );
}
