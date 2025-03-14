import React, { useEffect, useState } from "react";
import GraficoBarras from "./GraficoBarras";
import { obtenerSubsidioMensual } from "../../services/subsidioMensualService";
import styles from './ConsumoSubsidio.module.css';

interface SubsidoMensualProps {
  numeroConexion: string;  // Recibimos el número de conexión como prop
}

const ConsumoSubsidio: React.FC<SubsidoMensualProps> = ({ numeroConexion }) => {
  const [datosSubsidio, setDatosSubsidio] = useState<{ datosBarras: any[], datosLinea: any[] }>({
    datosBarras: [],
    datosLinea: []
  });
  const [subsidios, setSubsidios] = useState<number[]>([]);  // Guardamos los subsidios como un array
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos de consumo distrito
    obtenerSubsidioMensual(numeroConexion)
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

          // Guardamos los subsidios en un array separado
          const subsidiosArray = data.map(item => item.subsidio);

          setDatosSubsidio({ datosBarras, datosLinea });  // Guardamos ambos en el estado
          setSubsidios(subsidiosArray);  // Guardamos los subsidios por separado
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
  const contadorSubsidio = subsidios.reduce((total, subsidio) => total + subsidio, 0);

  // Obtener los meses con subsidio
  const mesesConSubsidio = subsidios
    .map((subsidio, index) => subsidio === 1 ? datosSubsidio.datosBarras[index].mes : null)
    .filter(mes => mes !== null);



  const ultimoMes = datosSubsidio.datosBarras.length > 0 ? datosSubsidio.datosBarras[datosSubsidio.datosBarras.length - 1] : null;
  const comparacion = ultimoMes && ultimoMes.consumo > ultimoMes.promedio ? "mayor" : "menor";

  // Mensaje dinámico con saltos de línea y palabras clave en negrita
  const mensajeDinamico = (
    <>
      Tu consumo del <strong>último mes</strong> en m³
      fue <strong>{comparacion}</strong> al <strong>promedio</strong> de
      los últimos <strong>6 meses</strong>
    </>
  );


  // Crear el mensaje dinámico
  let mensajeDinamico2: React.ReactElement = <></>;

  if (contadorSubsidio === 0) {
    mensajeDinamico2 = (
      <>
        {/* No mostrar nada */}
      </>
    );
  } else if (contadorSubsidio === 6) {
    mensajeDinamico2 = (
      <>
        Obtuviste subsidio durante los <strong>últimos 6 meses</strong>
      </>
    );
  } else if (contadorSubsidio === 1) {
    mensajeDinamico2 = (
      <>
        Tu subsidio fue registrado <strong>solo en el mes de {mesesConSubsidio[0]}</strong>
      </>
    );
  } else {
    mensajeDinamico2 = (
      <>
        Tu subsidio estuvo presente en los meses de:<br />
        <strong>{mesesConSubsidio.join(", ")}</strong>
      </>
    );
  }

  return (
    <div>
      {error && <div className="error">{error}</div>} {/* Mostramos el error si ocurre */}
      <GraficoBarras
        titulo="Consumo de Subsidio"
        datosBarras={datosSubsidio.datosBarras}
        datosLinea={datosSubsidio.datosLinea}
        colorBarras="#6DCEFE"
        colorLinea="#FFA500"
        mensajeDinamico={mensajeDinamico}
        claveBarras="promedio"
        claveLinea="consumo"
        leyendaBarras="Volumen facturado de su distrito"
        leyendaLinea="Volumen facturado del usuario"
      />
      <div className={styles.mensaje}>
        {mensajeDinamico2}
      </div>
    </div>
  );
};

export default ConsumoSubsidio;
