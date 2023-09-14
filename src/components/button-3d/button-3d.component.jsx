import "./button-3d.styles.css";

export default function Button3d({ color, size, text, type, click, ...other }) {
  return (
    <button
      type={type}
      onClick={click}
      className={`button-3d-sk button-color-${color} button-size-${size}`}
    >
      {text}
    </button>
  );
}
