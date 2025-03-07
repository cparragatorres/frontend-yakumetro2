import React, { useEffect, useState } from "react";
import GraficoBarras from "./GraficoBarras";
import { obtenerConsumoMensual } from "../../services/consumoMensualService";

interface ConsumoMensualProps {
  numeroConexion: string;  // Recibimos el número de conexión como prop
}

const ConsumoMensual: React.FC<ConsumoMensualProps> = ({ numeroConexion }) => {
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
          // Si la diferencia es positiva, significa que el consumo fue mayor que el promedio
          <>¡Buen trabajo! Has ahorrado <strong>{diferenciaDelUltimoMes} unidades</strong> de consumo respecto al promedio de los últimos 6 meses.</>
        ) : diferenciaDelUltimoMes < 0 ? (
          // Si la diferencia es negativa, significa que el consumo fue mayor al promedio
          <>Tu consumo en el último mes fue <strong>superior</strong> al promedio de los últimos 6 meses en <strong>{Math.abs(diferenciaDelUltimoMes)} unidades</strong>.</>
        ) : (
          // Si la diferencia es 0, significa que no hubo variación entre el consumo y el promedio
          <>Tu consumo en el último mes fue <strong>igual</strong> al promedio de los últimos 6 meses.</>
        )
      ) : (
        <></>  // Si no hay datos, no mostramos nada
      )}
    </>
  );


  return (
    <div>
      {error && <div className="error">{error}</div>} {/* Mostramos el error si ocurre */}

      {/* Gráfico de barras de consumo mensual */}
      <GraficoBarras
        titulo="Consumo Mensual"
        datosBarras={datosMensuales.datosBarras}
        datosLinea={datosMensuales.datosLinea}
        colorBarras="#005DBA"
        colorLinea="orange"
        mensajeDinamico={mensajeDinamico}
        claveBarras="consumo"
        claveLinea="promedio"
        leyendaBarras="Consumo por Usuario"
        leyendaLinea="Promedio"
      />

      {/* Nuevo gráfico de barras con la diferencia entre consumo y promedio */}
      <GraficoBarras
        titulo="Diferencia entre Consumo y Promedio"
        datosBarras={datosDiferencia}  // Usamos los datos de las diferencias calculadas
        datosLinea={[0,0,0,0,0,0]}  // Este gráfico no necesita la línea del promedio
        colorBarras="#AEED00"
        colorLinea="orange"
        mensajeDinamico={mensajeDinamico2}
        claveBarras="diferencia"  // Usamos la clave de diferencia calculada previamente
        claveLinea=""
        leyendaBarras="Diferencia"
        leyendaLinea=""
        domain={[-10, 10]}
      />
    </div>
  );
};

export default ConsumoMensual;
