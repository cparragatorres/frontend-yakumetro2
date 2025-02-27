import React from "react";
import GraficoBarras from "./GraficoBarras";

const datosDistrito = [
  { mes: "Junio", consumo: 20, promedio: 15 },
  { mes: "Julio", consumo: 22, promedio: 16 },
  { mes: "Agosto", consumo: 22, promedio: 15 },
  { mes: "Septiembre", consumo: 19, promedio: 14 },
  { mes: "Octubre", consumo: 21, promedio: 16 },
];

const ConsumoDistrito: React.FC = () => {

  // Obtener el consumo del último mes y compararlo con el promedio
  const ultimoMes = datosDistrito.length > 0 ? datosDistrito[datosDistrito.length - 1] : null;
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
    <GraficoBarras
      titulo="Consumo del Distrito"
      datos={datosDistrito}
      colorBarras="purple"
      colorLinea="orange"
      keyBarras="consumo"
      keyLinea="promedio"
      mensajeDinamico={mensajeDinamico}
    />
  );
};

export default ConsumoDistrito;
