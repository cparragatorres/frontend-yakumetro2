import React from "react";
import GraficoBarras from "./GraficoBarras";

const datosSubsidio = [
  { mes: "Junio", consumo: 56, promedio: 54 },
  { mes: "Julio", consumo: 54, promedio: 54 },
  { mes: "Agosto", consumo: 54, promedio: 54 },
  { mes: "Septiembre", consumo: 50, promedio: 50 },
  { mes: "Octubre", consumo: 55, promedio: 55 },
];

const ConsumoSubsidio: React.FC = () => {
  return (
    <GraficoBarras
      titulo="Consumo Subsidiado"
      datos={datosSubsidio}
      colorBarras="#00CFFF"
      colorLinea="#FF7300"
      keyBarras="consumo"
      keyLinea="promedio"
    />
  );
};

export default ConsumoSubsidio;
