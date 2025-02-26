import React, { useState } from "react";
import Header from "./components/Header/Header";
import Formulario from "./components/Formulario/Formulario";
import InformacionAgua from "./components/InformacionAgua/InformacionAgua";
import Resultados from "./components/Resultados/Resultados";
import Buscando from "./components/Buscando/Buscando";
import { obtenerVolumenFacturado } from "./services/volumenFacturadoService";
import { obtenerModalidadFacturacion } from "./services/modalidadFacturacionService";
import { obtenerSubsidioExiste } from "./services/subsidioExisteService";
import "./App.css";

const App: React.FC = () => {
  const [buscando, setBuscando] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [volumenFacturado, setVolumenFacturado] = useState<number | null>(null);
  const [modalidadFacturacion, setModalidadFacturacion] = useState<string | null>(null);
  const [subsidioExiste, setSubsidioExiste] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null); // Nuevo estado para manejar errores

  const handleBuscar = async (departamento: string, eps: string, numeroConexion: string) => {
    console.log("Datos recibidos en App.tsx:", { departamento, eps, numeroConexion });
    setBuscando(true);
    setError(null); // Reiniciar el estado de error antes de una nueva búsqueda

    try {
      const [volumenFacturado, modalidadFacturacion, subsidioExiste] = await Promise.all([
        obtenerVolumenFacturado(numeroConexion),
        obtenerModalidadFacturacion(numeroConexion),
        obtenerSubsidioExiste(numeroConexion),
      ]);

      setVolumenFacturado(volumenFacturado?.volumen_facturado ?? null);
      setModalidadFacturacion(modalidadFacturacion?.modalidad_facturacion ?? null);
      setSubsidioExiste(subsidioExiste?.existe_subsidio ?? null);

    } catch (err) {
      console.error("Error al obtener datos:", err);
      setError("Ocurrió un error al obtener la información. Inténtalo de nuevo.");
    } finally {
      setBuscando(false);
      setMostrarResultados(true);
    }
  };

  return (
    <div>
      <Header />
      {buscando ? (
        <Buscando />
      ) : mostrarResultados ? (
        <Resultados
          onVolver={() => setMostrarResultados(false)}
          volumenFacturado={volumenFacturado}
          modalidadFacturacion={modalidadFacturacion}
          subsidioExiste={subsidioExiste}
        />
      ) : (
        <>
          {error && <div className="error">{error}</div>}
          <Formulario onBuscar={handleBuscar} />
          <InformacionAgua />
        </>
      )}
    </div>
  );
};

export default App;
