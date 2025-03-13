import React, { useState } from "react";
import Header from "./components/Header/Header";
import Formulario from "./components/Formulario/Formulario";
import InformacionAgua from "./components/InformacionAgua/InformacionAgua";
import Resultados from "./components/Resultados/Resultados";
import Buscando from "./components/Buscando/Buscando";
import { obtenerVolumenFacturado } from "./services/volumenFacturadoService";
import { obtenerModalidadFacturacion } from "./services/modalidadFacturacionService";
import { obtenerSubsidioExiste } from "./services/subsidioExisteService";
import { VolumenFacturadoModels } from "./models/VolumenFacturadoModels";
import "./App.css";

const App: React.FC = () => {
  const [buscando, setBuscando] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [volumenFacturado, setVolumenFacturado] = useState<VolumenFacturadoModels | null>(null);
  const [modalidadFacturacion, setModalidadFacturacion] = useState<string | null>(null);
  const [subsidioExiste, setSubsidioExiste] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null); // Nuevo estado para manejar errores
  const [numeroConexion, setNumeroConexion] = useState<string>(""); // Añadimos el estado para el número de conexión

  const handleBuscar = async (departamento: string, eps: string, numeroConexion: string) => {
    console.log("Consultando API con el número de conexión:", numeroConexion);

    setBuscando(true);
    setError(null); // Reiniciar el estado de error antes de una nueva búsqueda
    setNumeroConexion(numeroConexion);

    try {
      const [volumenFacturadoResponse, modalidadFacturacion, subsidioExiste] = await Promise.all([
        obtenerVolumenFacturado(numeroConexion),
        obtenerModalidadFacturacion(numeroConexion),
        obtenerSubsidioExiste(numeroConexion),
      ]);

      if (volumenFacturadoResponse && volumenFacturadoResponse.length > 0) {
        const ultimoVolumen = volumenFacturadoResponse[volumenFacturadoResponse.length - 1];
        console.log("Último volumen facturado:", ultimoVolumen); // Aquí verás el último objeto con mes, volumen_facturado, etc.
        // como ver el promedio del ultimo volumen facturado
        console.log("Promedio del último volumen facturado:", ultimoVolumen.promedio);

        setVolumenFacturado(ultimoVolumen); // Accede correctamente a volumen_facturado
      } else {
        setVolumenFacturado(null);
      }

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
          ultimoVolumenFacturado={volumenFacturado}
          modalidadFacturacion={modalidadFacturacion}
          subsidioExiste={subsidioExiste}
          numeroConexion={numeroConexion}
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
