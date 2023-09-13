import "./inputText.styles.css";

export default function InputText({ placeholder, value, onChange }) {
  return (
    <input
      className="inputs-sk input-text"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
