import React, {useState} from "react";
import Header from "./components/Header/Header";
import Formulario from "./components/Formulario/Formulario";
import InformacionAgua from "./components/InformacionAgua/InformacionAgua";
import Resultados from "./components/Resultados/Resultados";
import Buscando from "./components/Buscando/Buscando";
import { obtenerVolumenFacturado } from "./services/volumenFacturadoService";
import { VolumenFacturado } from "./models/VolumenFacturado";
import "./App.css";

const App: React.FC = () => {
  const [buscando, setBuscando] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [volumenFacturado, setVolumenFacturado] = useState<number | null>(null);

  const handleBuscar = async(departamento: string, eps: string, numeroConexion: string) => {
    console.log("Datos recibidos en App.tsx:", { departamento, eps, numeroConexion });

    setBuscando(true);

    // Hacer la consulta a la API
    const resultado: VolumenFacturado | null = await obtenerVolumenFacturado(numeroConexion);

    if (resultado) {
      console.log("Datos obtenidos del volumen facturado:", resultado);
      setVolumenFacturado(resultado.volumen_facturado);
    }

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
         <Resultados onVolver={() => setMostrarResultados(false)} volumenFacturado={volumenFacturado} />
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
