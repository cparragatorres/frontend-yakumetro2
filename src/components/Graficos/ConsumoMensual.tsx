import React from "react";
import GraficoBarras from "./GraficoBarras";

const datosMensuales = [
  { mes: "Junio", consumo: 20 },
  { mes: "Julio", consumo: 22 },
  { mes: "Agosto", consumo: 19 },
  { mes: "Septiembre", consumo: 21 },
  { mes: "Octubre", consumo: 23 },
];

const ConsumoMensual: React.FC = () => {
  return <GraficoBarras titulo="Consumo Mensual" datos={datosMensuales} color="#0057FF" />;
};

export default ConsumoMensual;
