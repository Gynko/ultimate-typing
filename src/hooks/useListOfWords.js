import { useState, useEffect } from "react";
import oktoberJson from "../data/Oktoberfest.json";
import cancerJson from "../data/CancerAwareness.json";

export function useListOfWords(theme, wordToRemove) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (!wordToRemove) {
      if (theme === "oktoberfest") {
        setList(oktoberJson.ord);
      } else if (theme === "cancerAwareness") {
        setList(cancerJson.ord);
      }
    }
  }, [theme, wordToRemove]);

  useEffect(() => {
    if (wordToRemove) {
      setList((prevList) => prevList.filter((word) => word !== wordToRemove));
    }
  }, [wordToRemove]);
  return list;
}
