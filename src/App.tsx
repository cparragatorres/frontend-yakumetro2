import React from "react";
import Header from "./components/Header/Header";
import Formulario from "./components/Formulario/Formulario";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Formulario />
    </div>
  );
};

export default App;
