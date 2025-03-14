import React, { useEffect, useState } from "react";
import GraficoBarras from "./GraficoBarras";
import { obtenerConsumoMensual } from "../../services/consumoMensualService";
import { VolumenFacturadoModels } from "../../models/VolumenFacturadoModels";
import styles from './ConsumoSubsidio.module.css';

interface ConsumoMensualProps {
  numeroConexion: string;  // Recibimos el número de conexión como prop
  volumenFacturado: VolumenFacturadoModels | null;
}

const ConsumoMensual: React.FC<ConsumoMensualProps> = ({ numeroConexion, volumenFacturado }) => {
  const [datosMensuales, setDatosMensuales] = useState<{ datosBarras: any[], datosLinea: any[] }>({
    datosBarras: [],
    datosLinea: []
  });
  const [datosDiferencia, setDatosDiferencia] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamamos al servicio para obtener los datos de consumo mensual
    obtenerConsumoMensual(numeroConexion)
      .then((data) => {
        if (data) {
          const datosBarras = data.map((item) => ({
            mes: item.mes,
            consumo: item.consumo,
            promedio: item.promedio
          }));

          const datosLinea = data.map((item) => ({
            mes: item.mes,
            promedio: item.promedio
          }));

          // Calcular la diferencia entre consumo y promedio
          const datosBarrasConDiferencia = datosBarras.map((item) => ({
            ...item,
            diferencia: parseFloat((item.consumo - item.promedio).toFixed(2)), // Redondeamos a 2 decimales
          }));


          // Establecer el estado de los datos
          setDatosMensuales({ datosBarras: datosBarrasConDiferencia, datosLinea });
          setDatosDiferencia(datosBarrasConDiferencia); // Guardamos la diferencia
        } else {
          setError("No se pudieron obtener los datos de consumo.");
        }
      })
      .catch((err) => {
        console.error("❌ Error al obtener los datos:", err);
        setError("Hubo un error al obtener los datos.");
      });
  }, [numeroConexion]); // El efecto se ejecutará cada vez que cambie el número de conexión

  const ultimoMes = datosMensuales.datosBarras.length > 0 ? datosMensuales.datosBarras[datosMensuales.datosBarras.length - 1] : null;
  const comparacion = ultimoMes && ultimoMes.consumo > ultimoMes.promedio ? "mayor" : "menor";
  const diferenciaDelUltimoMes = ultimoMes ? parseFloat((ultimoMes.consumo - ultimoMes.promedio).toFixed(2)) : null;
  // Asegúrate de que volumenFacturado no sea null antes de intentar acceder a sus propiedades
  const promedioVolumen = volumenFacturado ? volumenFacturado.promedio : null;
  const diferenciaVolumenUltimoMes = volumenFacturado ? volumenFacturado.promedio - volumenFacturado.volumen_facturado : null;

  // Mensaje sobre el consumo y la comparación con el promedio
  const mensajeDinamico = (
    <>
      Tu consumo del <strong>último mes</strong> fue <strong>{comparacion}</strong> al <strong>promedio</strong> de los últimos <strong>6 meses</strong>
    </>
  );

  // Mensaje sobre si el usuario ahorró o no en el último mes
  const mensajeDinamico2 = (
    <>
      {diferenciaDelUltimoMes !== null ? (
        diferenciaDelUltimoMes > 0 ? (
          <>Tu consumo en el último mes <strong>superó</strong> el promedio de los últimos 6 meses en <strong>{Math.abs(diferenciaDelUltimoMes)} soles</strong>.</>
        ) : diferenciaDelUltimoMes < 0 ? (
          <>Has ahorrado <strong>{Math.abs(diferenciaVolumenUltimoMes!)} m³ </strong> lo cual significa un {diferenciaVolumenUltimoMes! > 0 ? "ahorro" : "gasto"} de <strong> S/{Math.abs(diferenciaDelUltimoMes)}</strong>.</>
        ) : (
          <>Tu consumo en el último mes fue <strong>igual</strong> al promedio de los últimos 6 meses.</>
        )
      ) : (
        <></> // Si no hay datos, no mostramos nada
      )}
    </>
  );


  return (
    <div>
      {error && <div className="error">{error}</div>} {/* Mostramos el error si ocurre */}
      <GraficoBarras
        titulo="Consumo Mensual"
        datosBarras={datosMensuales.datosBarras}
        datosLinea={datosMensuales.datosLinea}
        colorBarras="#005DBA"
        colorLinea="#FFA500"
        mensajeDinamico={mensajeDinamico}
        claveBarras="consumo"
        claveLinea="promedio"
        leyendaBarras="Consumo por Usuario"
        leyendaLinea="Promedio"
      />
      <div className={styles.mensaje_dinamico}>{mensajeDinamico2}</div>

    </div>

  );
};

export default ConsumoMensual;
