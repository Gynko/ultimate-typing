import { useEffect, useState } from "react";

export function useWordUnderscores(word) {
  const [underscores, setUnderscores] = useState([]);
  useEffect(() => {
    if (word && word.length > 0) {
      setUnderscores(word.map((letter) => "_"));
    }
  }, [word]);

  return underscores;
}
