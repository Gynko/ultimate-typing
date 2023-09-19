import { useContext } from "react";
import { MyContext } from "../../App";
import "./selectGame.styles.css";
import SectionTitle from "../../components/sectionTitle/sectionTitle.component";
import GameMode from "../../components/game-mode/gameMode.component";
import WordAttack from "../../assets/images/woman.png";
import Trivia from "../../assets/images/man.png";
import Button3d from "../../components/button-3d/button-3d.component";
import RadioImageSelector from "../../components/radioImageSelector/radioImageSelector.component";
import cancerAwareness from "../../assets/images/cancer.jpg";
import oktoberfest from "../../assets/images/octoberfest.jpeg";

export default function SelectGame() {
  const contextData = useContext(MyContext);
  const { currentUser, theme, gameMode, setPage } = contextData;

  function handleButtonStart() {
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
    <section className="select-game-theme-background">
      <h1 className="select-game-hello-message">Hello {currentUser}!</h1>
      <div className="select-container">
        <SectionTitle title={`Choose a game mode`} />
        <GameMode
          orientation="right"
          title="Word attack"
          game="game-words"
          description="Type the words you see on the screen as fast as you can!"
          image={WordAttack}
          alt="woman typing on a keyboard like a maniac"
        />
        <GameMode
          orientation="left"
          title="Time attack"
          game="game-words"
          description="Answer as many questions as you can in 60 seconds!"
          alt="man panicking when thinking about the answer to a question that he definitely should know"
          image={Trivia}
        />
      </div>
      <div className="select-container theme-container">
        <SectionTitle title={`Choose a theme`} />
        <RadioImageSelector choices={choices} />
        <div className="select-theme">
          {theme === "" || gameMode === "" ? (
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
    </section>
  );
}
