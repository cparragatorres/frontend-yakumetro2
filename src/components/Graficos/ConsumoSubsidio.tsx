import React from "react";
import GraficoBarras from "./GraficoBarras";

const datosSubsidio = [
  { mes: "Junio", consumo: 19 },
  { mes: "Julio", consumo: 21 },
  { mes: "Agosto", consumo: 22 },
  { mes: "Septiembre", consumo: 20 },
  { mes: "Octubre", consumo: 23 },
];

const ConsumoSubsidio: React.FC = () => {
  return <GraficoBarras titulo="Consumo de Subsidio" datos={datosSubsidio} color="#00CFFF" />;
};

export default ConsumoSubsidio;
