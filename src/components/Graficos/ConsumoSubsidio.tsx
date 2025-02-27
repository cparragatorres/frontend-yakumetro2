import React from "react";
import GraficoBarras from "./GraficoBarras";

const datosSubsidio = [
  { mes: "Junio", consumo: 56, promedio: 71.7 },
  { mes: "Julio", consumo: 54, promedio: 80.94 },
  { mes: "Agosto", consumo: 54, promedio: 80.94 },
  { mes: "Septiembre", consumo: 50, promedio: 68.43 },
  { mes: "Octubre", consumo: 55, promedio: 76.32 },
];

// Obtener el consumo del último mes y compararlo con el promedio
const ultimoMes = datosSubsidio.length > 0 ? datosSubsidio[datosSubsidio.length - 1] : null;
const comparacion = ultimoMes && ultimoMes.consumo > ultimoMes.promedio ? "mayor" : "menor";

// Mensaje dinámico con saltos de línea y palabras clave en negrita
const mensajeDinamico = (
  <>
    Tu consumo del <strong>último mes</strong> <br />
    fue <strong>{comparacion}</strong> al <strong>promedio</strong> de <br />
    los últimos <strong>6 meses</strong>
  </>
);

const ConsumoSubsidio: React.FC = () => {
  return (
    <GraficoBarras
      titulo="Consumo Subsidiado"
      datos={datosSubsidio}
      colorBarras="cyan"
      colorLinea="orange"
      keyBarras="consumo"
      keyLinea="promedio"
      mensajeDinamico={mensajeDinamico}
    />
  );
};

export default ConsumoSubsidio;
