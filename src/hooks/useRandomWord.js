import { useState, useEffect } from "react";
import oktoberJson from "../data/Oktoberfest.json";
import cancerJson from "../data/CancerAwareness.json";

export function useRandomWord(theme) {
  const [word, setWord] = useState([]);

  useEffect(() => {
    let listOfWords;
    if (theme === "oktoberfest") {
      listOfWords = oktoberJson.ord;
    } else if (theme === "cancerAwareness") {
      listOfWords = cancerJson.ord;
    }
    const randomIndex = Math.floor(Math.random() * listOfWords.length);
    setWord(listOfWords[randomIndex].split(""));
  }, [theme]);

  return word;
}
