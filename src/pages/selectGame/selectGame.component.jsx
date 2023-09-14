import { useContext } from "react";
import { MyContext } from "../../App";
import "./selectGame.styles.css";
import SectionTitle from "../../components/sectionTitle/sectionTitle.component";
import GameMode from "../../components/game-mode/gameMode.component";
import WordAttack from "../../assets/images/woman.png";
import Trivia from "../../assets/images/man.png";

export default function SelectGame() {
  const contextData = useContext(MyContext);
  const { currentUser } = contextData;
  return (
    <section className="select-game-background">
      <div className="main-title">
        <SectionTitle title={`Hello ${currentUser}!@Choose a game mode`} />
        <GameMode
          orientation="right"
          title="Word attack"
          description="Type the words you see on the screen as fast as you can!"
          image={WordAttack}
          alt="woman typing on a keyboard like a maniac"
        />
        <GameMode
          orientation="left"
          title="Trivia"
          description="Answer as many questions as you can in 60 seconds!"
          alt="man panicking when thinking about the answer to a question that he definitely should know"
          image={Trivia}
        />
      </div>
    </section>
  );
}
