import { useState } from "react";
import "./globalStyles.css";

import Home from "./pages/Home/Home.component.jsx";
import Header from "./components/header/header.component.jsx";

function App() {
  const [page, setPage] = useState("home");

  function pageRender() {
    if (page === "home") return <Home route={page} changeRoute={setPage} />;
    else {
      if (page !== "home") return <p>you are not at home</p>;
    }
  }

  return (
    <div>
      <Header></Header>
      {pageRender()}
    </div>
  );
}

export default App;
