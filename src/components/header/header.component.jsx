import { useContext } from "react";
import { MyContext } from "../../App";
import "./header.styles.css";
import typewriter from "../../assets/icons/typewriter.png";
import Button3d from "../button-3d/button-3d.component";

export default function Header() {
  const contextData = useContext(MyContext);
  const { setCurrentUser, setPage } = contextData;
  const { currentUser } = contextData;
  const buttonOpacity = currentUser === "" ? 0 : 1;

  function logout() {
    setCurrentUser("");
    setPage("home");
  }

  function gotoLink(link) {
    setPage(link);
  }

  return (
    <header className="header-sk">
      <nav className="header-nav">
        <ul className="links-container">
          <div className="first-links-container">
            <li className="links logo-container">
              <img
                src={typewriter}
                alt="typewriter logo"
                width="64"
                height="64"
              />
              <div className="links-logo-container">
                <p className="logo-ultimate">ULTIMATE</p>
                <p className="logo-typing">Typing</p>
              </div>
            </li>
            <li
              className="links"
              style={{
                opacity: buttonOpacity,
                pointerEvents: buttonOpacity === 0 ? "none" : "auto",
              }}
            >
              <Button3d
                color="yellow"
                to="select-game"
                size="small"
                text="Choose game"
                click={() => gotoLink("select-game")}
              />
            </li>
            <li
              className="links"
              style={{
                opacity: buttonOpacity,
                pointerEvents: buttonOpacity === 0 ? "none" : "auto",
              }}
            >
              <Button3d
                color="yellow"
                to="select-game"
                size="small"
                text="Leaderboard"
                click={() => gotoLink("trivia")}
              />
            </li>
          </div>

          <li
            className="links link-user-logout"
            style={{
              opacity: buttonOpacity,
              pointerEvents: buttonOpacity === 0 ? "none" : "auto",
            }}
          >
            {" "}
            <Button3d
              click={logout}
              color="red"
              to="select-game"
              size="small"
              text="Logout"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
