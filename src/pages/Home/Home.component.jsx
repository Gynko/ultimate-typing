import { useContext, useState } from "react";
import { MyContext } from "../../App";
import "./Home.styles.css";
import TypewriterBig from "../../assets/images/typewriter-big.png";
import Button3d from "../../components/button-3d/button-3d.component";
import InputText from "../../components/inputText/inputText.component";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const contextData = useContext(MyContext);
  const { setCurrentUser, setPage } = contextData;

  function handleSubmit(event) {
    event.preventDefault();
    setCurrentUser(inputValue);
    setPage("select-game");
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="home-background">
      <img src={TypewriterBig} alt="typewriter logo" width="500" height="500" />
      <form className="inputs-container" onSubmit={handleSubmit}>
        <InputText
          placeholder=""
          label="Name thyself, brave typing adventurer!"
          onChange={handleInputChange}
          value={inputValue}
          autoFocus={true}
          type="text"
        />
        <Button3d
          color={inputValue === "" ? "grey" : "green"}
          size="big"
          text="enter"
          type={inputValue === "" ? "button" : "submit"}
        />
      </form>
    </div>
  );
}
