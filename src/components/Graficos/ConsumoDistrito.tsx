import React, { useEffect, useState } from "react";
import GraficoBarras from "./GraficoBarras";
import { obtenerconsumoDistrito } from "../../services/consumoDistritoService";
import { ConsumoDistritoModels } from "../../models/consumoDistritoModels";

interface ConsumoDistritoProps {
  numeroConexion: string;  // Recibimos el número de conexión como prop
}

const ConsumoDistrito: React.FC<ConsumoDistritoProps> = ({ numeroConexion }) => {
  const [datosDistrito, setDatosDistritos] = useState<{ datosBarras: any[], datosLinea: any[] }>({
      datosBarras: [],
      datosLinea: []
    });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      // Llamamos al servicio para obtener los datos de consumo distrito
      obtenerconsumoDistrito(numeroConexion)
        .then((data) => {
          if (data) {
            const datosBarras = data.map((item) => ({
              mes: item.mes,
              consumo: item.promedio
            }));
            const datosLinea = data.map((item) => ({
              mes: item.mes,
              consumo: item.consumo
            }));

            setDatosDistritos({ datosBarras, datosLinea });  // Guardamos ambos en el estado
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
  const ultimoMes = datosDistrito.datosBarras.length > 0 ? datosDistrito.datosBarras[datosDistrito.datosBarras.length - 1] : null;
  const comparacion = ultimoMes && ultimoMes.consumo > ultimoMes.promedio ? "mayor" : "menor";

  // Mensaje dinámico con saltos de línea y palabras clave en negrita
  const mensajeDinamico = (
    <>
      Tu <strong>último</strong> consumo fue<br />
      <strong>{comparacion}</strong> que el <strong>promedio</strong><br />
      de tu distrito en el <strong>último</strong> mes
    </>
  );

  return (
    <div>
      {error && <div className="error">{error}</div>} {/* Mostramos el error si ocurre */}
      <GraficoBarras
        titulo="Consumo Mensual"
        datosBarras={datosDistrito.datosBarras}
        datosLinea={datosDistrito.datosLinea}
        colorBarras="purple"
        colorLinea="orange"
        mensajeDinamico={mensajeDinamico}
        claveBarras="consumo"
        claveLinea="promedio"
        leyendaBarras="Consumo"
        leyendaLinea="Promedio"
      />
    </div>
  );
};

export default ConsumoDistrito;
