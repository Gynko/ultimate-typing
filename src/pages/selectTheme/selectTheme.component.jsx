import { useContext } from "react";
import { MyContext } from "../../App";
import "./selectTheme.styles.css";
import SectionTitle from "../../components/sectionTitle/sectionTitle.component";
import cancerAwareness from "../../assets/images/cancer.jpg";
import oktoberfest from "../../assets/images/octoberfest.jpeg";
import Button3d from "../../components/button-3d/button-3d.component";
import RadioImageSelector from "../../components/radioImageSelector/radioImageSelector.component";

export default function SelectTheme() {
  const contextData = useContext(MyContext);
  const { theme, gameMode, setPage } = contextData;

  function handleButtonStart() {
    console.log(gameMode);
    setPage(gameMode);
  }

  const choices = [
    {
      image: cancerAwareness,
      description: "Cancer awareness",
      theme: "cancerAwareness",
    },
    {
      image: oktoberfest,
      description: "Oktoberfest",
      theme: "oktoberfest",
    },
  ];

  return (
    <div className="selecttheme-background">
      <div className="select-theme-container">
        <SectionTitle title={`Choose a theme`} />
        <RadioImageSelector choices={choices} />

        <div className="selecttheme-button-start-container">
          {theme === "" ? (
            <Button3d color="grey" text="start game" size="small" />
          ) : (
            <Button3d
              color="red"
              text="start game"
              size="small"
              click={handleButtonStart}
            />
          )}
        </div>
      </div>
    </div>
  );
}
