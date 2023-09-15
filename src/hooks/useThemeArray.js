import { useState, useEffect } from "react";
import oktoberJson from "../data/Oktoberfest.json";
import cancerJson from "../data/CancerAwareness.json";

export function useListOfWords(theme) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (theme === "oktoberfest") {
      setList(oktoberJson.ord);
    } else if (theme === "cancerAwareness") {
      setList(cancerJson.ord);
    }
  }, [theme]);
  return list;
}
