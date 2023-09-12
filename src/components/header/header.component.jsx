import "./header.styles.css";
import typewriter from "../../assets/icons/typewriter.png";

export default function Header() {
  return (
    <header className="header-sk">
      <nav className="header-nav">
        <ul className="link-container">
          <li className="links">
            <img src={typewriter} alt="typewriter logo" width="64" />
          </li>
          <li className="links">first link</li>
        </ul>
      </nav>
    </header>
  );
}
