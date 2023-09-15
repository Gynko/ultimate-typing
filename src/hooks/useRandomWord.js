import { useState, useEffect } from "react";
export function useRandomWord(theme, list) {
  const [word, setWord] = useState([]);

  useEffect(() => {
    if (list && list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      setWord(list[randomIndex].split(""));
    }
  }, [list]);

  return word;
}
