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
    } else {
      if (theme === "oktoberfest") {
        setList(oktoberJson.ord.filter((word) => word !== wordToRemove));
      } else if (theme === "cancerAwareness") {
        setList(cancerJson.ord.filter((word) => word !== wordToRemove));
      }
    }
  }, [theme, wordToRemove]);
  return list;
}
