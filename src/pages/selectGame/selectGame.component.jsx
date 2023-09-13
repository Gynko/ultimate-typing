import { useContext } from "react";
import { MyContext } from "../../App";
import Button3d from "../../components/button-3d/button-3d.component";
import "./selectGame.styles.css";

export default function SelectGame() {
  const contextData = useContext(MyContext);
  const { currentUser } = contextData;
  return (
    <div className="select-game-background">
      <p>select game</p>
      <p>{currentUser}</p>

      <Button3d color="green" to="home" />
    </div>
  );
}
