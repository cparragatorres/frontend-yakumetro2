import React from "react";
import GraficoBarras from "./GraficoBarras";

const datosManzana = [
  { mes: "Junio", consumo: 18 },
  { mes: "Julio", consumo: 20 },
  { mes: "Agosto", consumo: 22 },
  { mes: "Septiembre", consumo: 19 },
  { mes: "Octubre", consumo: 21 },
];

const ConsumoManzana: React.FC = () => {
  return <GraficoBarras titulo="Consumo de la Manzana" datos={datosManzana} color="#00A000" />;
};

export default ConsumoManzana;
