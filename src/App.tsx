import React, {useState} from "react";
import Header from "./components/Header/Header";
import Formulario from "./components/Formulario/Formulario";
import InformacionAgua from "./components/InformacionAgua/InformacionAgua";
import Resultados from "./components/Resultados/Resultados";
import Buscando from "./components/Buscando/Buscando";
import "./App.css";

const App: React.FC = () => {
  const [buscando, setBuscando] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleBuscar = () => {
    setBuscando(true);
    setTimeout(() => {
      setBuscando(false);
      setMostrarResultados(true);
    }, 3000); // Simulamos 3 segundos de carga
  };

  return (
    <div>
      <Header />
      {buscando ?
        <Buscando />
       : mostrarResultados ? (
        <Resultados onVolver={() => setMostrarResultados(false)} />
      ) : (
        <>
          <Formulario onBuscar={handleBuscar} />
          <InformacionAgua />
        </>
      )}
    </div>
  );
};

export default App;
