import React from "react";
import GraficoBarras from "./GraficoBarras";

const datosDistrito = [
  { mes: "Junio", consumo: 23 },
  { mes: "Julio", consumo: 25 },
  { mes: "Agosto", consumo: 24 },
  { mes: "Septiembre", consumo: 22 },
  { mes: "Octubre", consumo: 26 },
];

const ConsumoDistrito: React.FC = () => {
  return <GraficoBarras titulo="Consumo del Distrito" datos={datosDistrito} color="#6A0DAD" />;
};

export default ConsumoDistrito;
