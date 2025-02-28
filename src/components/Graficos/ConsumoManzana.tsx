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

  // Obtener el consumo del último mes y compararlo con el promedio
  const ultimoMes = datosManzana.length > 0 ? datosManzana[datosManzana.length - 1] : null;
  const comparacion = ultimoMes && ultimoMes.consumo > ultimoMes.promedio ? "mayor" : "menor";

  // Mensaje dinámico con saltos de línea y palabras clave en negrita
  const mensajeDinamico = (
    <>
      Tu consumo del <strong>último mes</strong> <br />
      fue <strong>{comparacion}</strong> al <strong>promedio</strong> de <br />
      los últimos <strong>6 meses</strong>
    </>
  );

  return (
    <GraficoBarras
    titulo="Consumo Mensual"
    datosBarras={datosManzana.map((item) => ({ mes: item.mes, consumo: item.consumo }))}
    datosLinea={datosManzana.map((item) => ({ mes: item.mes, consumo: item.promedio }))}
    colorBarras="blue"
    colorLinea="orange"
    mensajeDinamico={mensajeDinamico}
    claveBarras="consumo"
    claveLinea="promedio"
    />
  );
};

export default ConsumoManzana;
