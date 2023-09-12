import "./Home.styles.css";
import TypewriterBig from "../../assets/images/typewriter-big.png";
import Button3d from "../../components/button-3d/button-3d.component";

export default function Home({ route, changeRoute }) {
  return (
    <div className="home-background">
      <img src={TypewriterBig} alt="typewriter logo" width="500" height="500" />
      <div className="inputs-container">
        <input
          className="inputs-sk input-text"
          type="text"
          placeholder="you have a name?"
        />
        <Button3d color="green" changeRoute={changeRoute} to="select-game" />
      </div>
    </div>
  );
}
