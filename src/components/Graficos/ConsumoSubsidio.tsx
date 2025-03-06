import React, { useEffect, useState } from "react";
import GraficoBarras from "./GraficoBarras";
import { obtenerSubsidioMensual } from "../../services/subsidioMensualService";

interface SubsidoMensualProps {
  numeroConexion: string;  // Recibimos el número de conexión como prop
}

const ConsumoSubsidio: React.FC<SubsidoMensualProps> = ({numeroConexion}) => {
  const [datosSubsidio, setDatosSubsidio] = useState<{ datosBarras: any[], datosLinea: any[] }>({
      datosBarras: [],
      datosLinea: []
    });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
        // Llamamos al servicio para obtener los datos de consumo distrito
        obtenerSubsidioMensual(numeroConexion)
          .then((data) => {
            if (data) {
              const datosBarras = data.map((item) => ({
                mes: item.mes,
                subsidio: item.subsidio
              }));
              const datosLinea = data.map((item) => ({
                mes: item.mes,
                subsidio: item.subsidio
              }));

              // Verifica que los datos estén bien asignados para las barras y la línea
              console.log("🔵 Datos de Barras (promedio):", datosBarras);
              console.log("🟠 Datos de Línea (consumo):", datosLinea);

              setDatosSubsidio({ datosBarras, datosLinea });  // Guardamos ambos en el estado
            } else {
              setError("No se pudieron obtener los datos de subsidio.");
            }
          })
          .catch((err) => {
            console.error("❌ Error al obtener los datos:", err);
            setError("Hubo un error al obtener los datos.");
          });
      }, [numeroConexion]); // El efecto se ejecutará cada vez que cambie el número de conexión

  // Obtener el total de subsidio
  const contadorSubsidio = datosSubsidio.datosBarras.reduce((total, item) => total + item.subsidio, 0);

  // Obtener los meses con subsidio
  const mesesConSubsidio = datosSubsidio.datosBarras
    .filter(item => item.subsidio === 1)
    .map(item => item.mes);

  // Crear el mensaje dinámico
  let mensajeDinamico: React.ReactElement = <></>;

  if (contadorSubsidio === 0) {
    mensajeDinamico = (
      <>
        No se registraron subsidios en los últimos 6 meses.
      </>
    );
  } else if (contadorSubsidio === 6) {
    mensajeDinamico = (
      <>
        Obtuviste subsidio durante los <strong>últimos 6 meses</strong>.
      </>
    );
  } else if (contadorSubsidio === 1) {
    mensajeDinamico = (
      <>
        Tu subsidio fue registrado <strong>solo en el mes de {mesesConSubsidio[0]}</strong>.
      </>
    );
  } else {
    mensajeDinamico = (
      <>
        Tu subsidio estuvo presente en los meses de: <strong>{mesesConSubsidio.join(", ")}</strong>.
      </>
    );
  }

  return (
    <div>
      {error && <div className="error">{error}</div>} {/* Mostramos el error si ocurre */}
    <GraficoBarras
    titulo="Subsidio Mensual"
    datosBarras={datosSubsidio.datosBarras}
    datosLinea={datosSubsidio.datosLinea}
    colorBarras="#2D9CDB"
    colorLinea="orange"
    mensajeDinamico={mensajeDinamico}
    claveBarras="subsidio"
    claveLinea="subsidio"
    leyendaBarras="Subsidio"
    leyendaLinea="Subsidio"
    domain={[0, 1]} // asignarle una altura fija que no es obligatoria
    />
    </div>
  );
};

export default ConsumoSubsidio;
