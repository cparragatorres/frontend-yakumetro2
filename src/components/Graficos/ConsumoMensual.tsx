import React, { useEffect } from "react";
import GraficoBarras from "./GraficoBarras";

const datosMensuales = [
  { mes: "Junio", consumo: 20, promedio: 20.8 },
  { mes: "Julio", consumo: 22, promedio: 20.8 },
  { mes: "Agosto", consumo: 22, promedio: 20.8 },
  { mes: "Septiembre", consumo: 19, promedio: 20.8 },
  { mes: "Octubre", consumo: 21, promedio: 20.8 },
];

const ConsumoMensual: React.FC = () => {
  useEffect(() => {
    console.log("Datos mensuales:", datosMensuales);
    console.log("Promedios:", datosMensuales.map(d => d.promedio));
  }, []);

  return (
    <GraficoBarras
      titulo="Consumo Mensual"
      datos={datosMensuales}
      colorBarras="blue"
      colorLinea="orange"
      keyBarras="consumo"
      keyLinea="promedio"
    />
  );
};

export default ConsumoMensual;
