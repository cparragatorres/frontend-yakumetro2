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
  return (
    <GraficoBarras
      titulo="Consumo del Distrito"
      datos={datosDistrito}
      colorBarras="#6A0DAD"
      colorLinea="#FF7300"
      keyBarras="consumo"
      keyLinea="promedio"
    />
  );
};

export default ConsumoDistrito;
