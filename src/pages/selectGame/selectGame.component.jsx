import Button3d from "../../components/button-3d/button-3d.component";
import "./selectGame.styles.css";

export default function SelectGame() {
  return (
    <div className="select-game-background">
      <p>select game</p>
      <Button3d color="green" to="home" />
    </div>
  );
}
