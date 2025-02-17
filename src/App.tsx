import React from "react";
import Header from "./components/Header/Header";
import Formulario from "./components/Formulario/Formulario";
import InformacionAgua from "./components/InformacionAgua/InformacionAgua";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Formulario />
      <InformacionAgua />
    </div>
  );
};

export default App;
