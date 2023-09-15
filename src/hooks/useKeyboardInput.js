import { useEffect } from "react";

export function useKeyboardInput(callback, condition) {
  useEffect(() => {
    if (condition) {
      window.addEventListener("keydown", callback);

      return () => {
        window.removeEventListener("keydown", callback);
      };
    }
  }, [condition, callback]);
}
