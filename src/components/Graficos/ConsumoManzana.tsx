import React from "react";
import GraficoBarras from "./GraficoBarras";

const datosManzana = [
  { mes: "Junio", consumo: 20, promedio: 15 },
  { mes: "Julio", consumo: 22, promedio: 14 },
  { mes: "Agosto", consumo: 22, promedio: 14 },
  { mes: "Septiembre", consumo: 19, promedio: 13 },
  { mes: "Octubre", consumo: 21, promedio: 15 },
];

const ConsumoManzana: React.FC = () => {
  return (
    <GraficoBarras
      titulo="Consumo de la Manzana"
      datos={datosManzana}
      colorBarras="#00A000"
      colorLinea="#FF7300"
      keyBarras="consumo"
      keyLinea="promedio"
    />
  );
};

export default ConsumoManzana;
