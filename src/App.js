import { useState, createContext } from "react";
import "./globalStyles.css";
import Home from "./pages/Home/Home.component.jsx";
import Header from "./components/header/header.component.jsx";

export const MyContext = createContext();

function App() {
  const [page, setPage] = useState("home");

  function pageRender() {
    if (page === "home") return <Home route={page} changeRoute={setPage} />;
    else {
      if (page !== "home") return <p>you are not at home</p>;
    }
  }

  return (
    <MyContext.Provider value={{ page, setPage }}>
      <div>
        <Header></Header>
        {pageRender()}
      </div>
    </MyContext.Provider>
  );
}

export default App;
