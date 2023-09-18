import { useEffect, useRef } from "react";
import "./inputText.styles.css";

export default function InputText({ label, placeholder, value, onChange, autoFocus }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input
        ref={inputRef}
        className="inputs-sk input-text"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
