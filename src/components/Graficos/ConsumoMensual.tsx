import React, { useEffect, useState } from "react";
import GraficoBarras from "./GraficoBarras";
import { obtenerConsumoMensual } from "../../services/consumoMensualService";
import { ConsumoMensualModels } from "../../models/consumoMensualModels";

interface ConsumoMensualProps {
  numeroConexion: string;  // Recibimos el número de conexión como prop
}

const ConsumoMensual: React.FC<ConsumoMensualProps> = ({ numeroConexion }) => {
  const [datosMensuales, setDatosMensuales] = useState<{ datosBarras: any[], datosLinea: any[] }>( {
    datosBarras: [],
    datosLinea: []
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos de consumo mensual
    obtenerConsumoMensual(numeroConexion)
      .then((data) => {
        if (data) {
          const datosBarras = data.map((item) => ({
            mes: item.mes,
            consumo: item.consumo
          }));

          const datosLinea = data.map((item) => ({
            mes: item.mes,
            promedio: item.promedio
          }));

          // Verificamos los datos de las barras y la línea
          console.log("🔵 Datos de Barras (consumo):", datosBarras); // Verifica que los datos de consumo sean correctos
          console.log("🟠 Datos de Línea (promedio):", datosLinea); // Verifica que los datos del promedio sean correctos

          setDatosMensuales({ datosBarras, datosLinea }); // Guardamos ambos en el estado
        } else {
          setError("No se pudieron obtener los datos de consumo.");
        }
      })
      .catch((err) => {
        console.error("❌ Error al obtener los datos:", err);
        setError("Hubo un error al obtener los datos.");
      });
  }, [numeroConexion]); // El efecto se ejecutará cada vez que cambie el número de conexión

  // Obtener el consumo del último mes y compararlo con el promedio
  const ultimoMes = datosMensuales.datosBarras.length > 0 ? datosMensuales.datosBarras[datosMensuales.datosBarras.length - 1] : null;
  const comparacion = ultimoMes && ultimoMes.consumo > ultimoMes.promedio ? "mayor" : "menor";

  // Mensaje dinámico con saltos de línea y palabras clave en negrita
  const mensajeDinamico = (
    <>
      Tu consumo del<br />
      <strong>último mes</strong> <br />
      fue <strong>{comparacion}</strong> al <strong>promedio</strong><br />
      de los últimos <strong>6 meses</strong>
    </>
  );

  return (
    <div>
      {error && <div className="error">{error}</div>} {/* Mostramos el error si ocurre */}
      <GraficoBarras
        titulo="Consumo Mensual"
        datosBarras={datosMensuales.datosBarras}
        datosLinea={datosMensuales.datosLinea}
        colorBarras="blue"
        colorLinea="orange"
        mensajeDinamico={mensajeDinamico}
        claveBarras="consumo"
        claveLinea="promedio"
        leyendaBarras="Consumo por Usuario"
        leyendaLinea="Promedio"
      />
    </div>
  );
};

export default ConsumoMensual;
