import { useContext } from "react";
import { MyContext } from "../../App";
import "./timer.styles.css";

export default function Timer() {
  const contextData = useContext(MyContext);
  const { timer } = contextData;

  return (
    <div className="timer-circle">
      <p className="timer-countdown">{`${timer}`}</p>
      <p className="timer-seconds">seconds</p>
    </div>
  );
}
