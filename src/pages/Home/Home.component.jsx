export default function Home({ route, changeRoute }) {
  function changeMyRoute() {
    changeRoute("not home");
  }
  return (
    <div>
      <h1>this is home</h1>
      <button onClick={changeMyRoute}>change route</button>
    </div>
  );
}
