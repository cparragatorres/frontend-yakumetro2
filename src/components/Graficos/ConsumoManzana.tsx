import React, {useEffect, useState} from "react";
import GraficoBarras from "./GraficoBarras";
import { obtenerManzanaMensual} from "../../services/manzanaMensualService";

const datosManzana = [];

interface ManzanaMensualProps {
  numeroConexion: string;
}

const ConsumoManzana: React.FC<ManzanaMensualProps> = ({ numeroConexion }) => {
  const [datosManzana, setDatosManzana] = useState<{ datosBarras: any[], datosLinea: any[] }>({
      datosBarras: [],
      datosLinea: []
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Llamamos al servicio para obtener los datos de consumo distrito
        obtenerManzanaMensual(numeroConexion)
          .then((data) => {
            if (data) {
              const datosBarras = data.map((item) => ({
                mes: item.mes,
                promedio: item.promedio
              }));
              const datosLinea = data.map((item) => ({
                mes: item.mes,
                consumo: item.consumo
              }));

              // Verifica que los datos estén bien asignados para las barras y la línea
              console.log("🔵 Datos de Barras Manzana (promedio):", datosBarras);
              console.log("🟠 Datos de Línea Manzana (consumo):", datosLinea);

              setDatosManzana({ datosBarras, datosLinea });  // Guardamos ambos en el estado
            } else {
              setError("No se pudieron obtener los datos de manzana.");
            }
          })
          .catch((err) => {
            console.error("❌ Error al obtener los datos:", err);
            setError("Hubo un error al obtener los datos.");
          });
      }, [numeroConexion]);

  // Obtener el consumo del último mes y compararlo con el promedio
  const ultimoMes = datosManzana.datosBarras.length > 0 ? datosManzana.datosBarras[datosManzana.datosBarras.length - 1] : null;
  const comparacion = ultimoMes && ultimoMes.consumo > ultimoMes.promedio ? "mayor" : "menor";

  // Mensaje dinámico con saltos de línea y palabras clave en negrita
  const mensajeDinamico = (
    <>
      Tu consumo del <strong>último mes</strong> en m³
      fue <strong>{comparacion}</strong> al <strong>promedio</strong> de
      los últimos <strong>6 meses</strong>
    </>
  );

  return (
    <div>
      {error && <div className="error">{error}</div>} {/* Mostramos el error si ocurre */}
      <GraficoBarras
        titulo="Consumo de la Manzana"
        datosBarras={datosManzana.datosBarras}
        datosLinea={datosManzana.datosLinea}
        colorBarras="#AEED00"
        colorLinea="orange"
        mensajeDinamico={mensajeDinamico}
        claveBarras="promedio"
        claveLinea="consumo"
        leyendaBarras="Volumen facturado por manzana"
        leyendaLinea="Volumen facturado del usuario"
      />
    </div>
  );
};

export default ConsumoManzana;
