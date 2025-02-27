import React, { useEffect, useState } from "react";
import GraficoBarras from "./GraficoBarras";
import { obtenerConsumoMensual } from "../../services/consumoMensualService";
import { ConsumoMensualModels } from "../../models/consumoMensualModels";

interface ConsumoMensualProps {
  numeroConexion: string;  // Recibimos el número de conexión como prop
}

const ConsumoMensual: React.FC<ConsumoMensualProps> = ({ numeroConexion }) => {
  const [datosMensuales, setDatosMensuales] = useState<ConsumoMensualModels[]>([]); // Tipo de estado adecuado
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos de consumo mensual
    obtenerConsumoMensual(numeroConexion)
      .then((data) => {
        if (data) {
          setDatosMensuales(data); // Asignamos los datos de la respuesta al estado
        } else {
          setError("No se pudieron obtener los datos de consumo.");
        }
      })
      .catch((err) => {
        console.error("Error al obtener los datos:", err);
        setError("Hubo un error al obtener los datos.");
      });
  }, [numeroConexion]); // El efecto se ejecutará cada vez que cambie el número de conexión

  // Obtener el consumo del último mes y compararlo con el promedio
  const ultimoMes = datosMensuales.length > 0 ? datosMensuales[datosMensuales.length - 1] : null;
  const comparacion = ultimoMes && ultimoMes.consumo > ultimoMes.promedio ? "mayor" : "menor";

  // Mensaje dinámico con saltos de línea y palabras clave en negrita
  const mensajeDinamico = (
    <>
      Tu consumo del <strong>último mes</strong> <br />
      fue <strong>{comparacion}</strong> al <strong>promedio</strong> de <br />
      los últimos <strong>6 meses</strong>
    </>
  );


  return (
    <div>
      {error && <div className="error">{error}</div>} {/* Mostramos el error si ocurre */}
      <GraficoBarras
        titulo="Consumo Mensual"
        datos={datosMensuales}
        colorBarras="blue"
        colorLinea="orange"
        keyBarras="consumo"
        keyLinea="promedio"
        mensajeDinamico={mensajeDinamico}
      />
    </div>
  );
};

export default ConsumoMensual;
