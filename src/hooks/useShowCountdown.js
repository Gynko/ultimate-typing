import { useState, useEffect } from "react";

export function useShowCountdown(duration) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return show;
}
