import { useContext } from "react";
import "./button-3d.styles.css";
import { MyContext } from "../../App";

export default function Button3d({ color, changeRoute, to }) {
  const contextData = useContext(MyContext);
  const { setPage } = contextData;

  function changeMyRoute() {
    console.log("route changed to", to);
    setPage(to);
  }
  return (
    <button onClick={changeMyRoute} className={`button-3d-sk button-${color}`}>
      Enter
    </button>
  );
}
