import React from "react";
import GraficoBarras from "./GraficoBarras";

const datosSubsidio = [
  { mes: "Junio", consumo: 56, promedio: 71.7 },
  { mes: "Julio", consumo: 54, promedio: 80.94 },
  { mes: "Agosto", consumo: 54, promedio: 80.94 },
  { mes: "Septiembre", consumo: 50, promedio: 68.43 },
  { mes: "Octubre", consumo: 55, promedio: 76.32 },
];

const ConsumoSubsidio: React.FC = () => {
  return (
    <GraficoBarras
      titulo="Consumo Subsidiado"
      datos={datosSubsidio}
      colorBarras="cyan"
      colorLinea="orange"
      keyBarras="consumo"
      keyLinea="promedio"
    />
  );
};

export default ConsumoSubsidio;
