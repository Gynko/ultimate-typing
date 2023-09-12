import { useContext } from "react";
import "./button-3d.styles.css";
import { MyContext } from "../../App";

export default function Button3d({ color, to }) {
  const contextData = useContext(MyContext);
  const { setPage } = contextData;

  function changeMyRoute() {
    setPage(to);
  }
  return (
    <button onClick={changeMyRoute} className={`button-3d-sk button-${color}`}>
      Enter
    </button>
  );
}
