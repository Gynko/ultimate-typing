import { useState, useEffect, useRef } from "react";
import oktoberJson from "../data/Oktoberfest.json";
import cancerJson from "../data/CancerAwareness.json";

export function useListOfWords(theme, wordToRemove) {
  const [list, setList] = useState([]);
  const initialized = useRef(false); // To track if the list was initialized

  const initializeList = () => {
    if (theme === "oktoberfest") {
      setList(oktoberJson.ord);
    } else if (theme === "cancerAwareness") {
      setList(cancerJson.ord);
    }
    initialized.current = true; // Mark the list as initialized
  };

  useEffect(() => {
    if (!wordToRemove && !initialized.current) {
      initializeList();
    }
  }, [theme, wordToRemove]);

  useEffect(() => {
    if (wordToRemove) {
      setList((prevList) => {
        const newList = prevList.filter((word) => word !== wordToRemove);
        // If the list becomes empty, repopulate it and reset the initialized flag.
        if (newList.length === 0) {
          initializeList();
          initialized.current = false; // Reset the initialized flag
          return list; // Return the original list
        }
        return newList;
      });
    }
  }, [wordToRemove]);

  return list;
}
