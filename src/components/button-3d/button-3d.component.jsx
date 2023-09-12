import "./button-3d.styles.css";

export default function Button3d({ color, changeRoute, to }) {
  function changeMyRoute() {
    console.log("route changed to", to);
    changeRoute(to);
  }
  return (
    <button onClick={changeMyRoute} className={`button-3d-sk button-${color}`}>
      Enter
    </button>
  );
}
