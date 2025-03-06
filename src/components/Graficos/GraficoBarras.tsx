import React from "react";
import styles from "./GraficoBarras.module.css";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Line,
  LabelList
} from "recharts";

interface GraficoBarrasProps {
  titulo: string;
  datosBarras: any[];
  datosLinea: any[];
  colorBarras: string;
  colorLinea: string;
  mensajeDinamico: React.ReactNode;
  claveBarras: string;
  claveLinea: string;
  leyendaBarras: string;   // Leyenda para las barras
  leyendaLinea: string;    // Leyenda para la línea
  domain?: [number, number];
}

const GraficoBarras: React.FC<GraficoBarrasProps> = ({
  titulo, datosBarras, datosLinea, colorBarras, colorLinea, mensajeDinamico,
  claveBarras, claveLinea, leyendaBarras, leyendaLinea, domain
}) => {
  const maxValorBarras = Math.max(...datosBarras.map(item => item[claveBarras]));
  const maxValorLinea = Math.max(...datosLinea.map(item => item[claveLinea]));
  const maxValorRedondeado = Math.ceil((Math.max(maxValorBarras, maxValorLinea))/ 10) * 10;

  // Si no se pasa `domain`, usamos un valor predeterminado
  const dominioFinal = domain || [0, maxValorRedondeado];  // Valor predeterminado si no se pasa

  // Componente personalizado para el Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { mes } = payload[0].payload;  // Extraemos el mes de la primera barra o línea
      const consumo = payload[0].value;    // Valor de la barra
      const promedio = payload[1] ? payload[1].value : null;  // Valor de la línea (verificamos que exista)

      return (
        <div className={`${styles.tooltipContainer} ${styles.defaultTooltip}`}>
          <h4>{mes}</h4>
          <p style={{ color: colorBarras }}>{leyendaBarras}: {consumo}</p>  {/* Aplicamos el color dinámico */}
          {promedio !== null && <p style={{ color: colorLinea }}>{leyendaLinea}: {promedio}</p>}  {/* También para la línea */}
        </div>
      );
    }
    return null; // Retorna null si no está activo o si no hay datos
  };


  return (
    <div className={styles.contenedor}>
      <h3 className={styles.titulo} style={{ backgroundColor: colorBarras }}>{titulo}</h3>
      <div className={styles.graficoContainer}>
        <ResponsiveContainer width="70%" height={300}>
          <ComposedChart data={datosBarras} margin={{ top: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis domain={dominioFinal} />
            <Tooltip content={<CustomTooltip />} />
            <Legend payload={[
              { value: leyendaBarras, type: 'square', color: colorBarras },
              { value: leyendaLinea, type: 'line', color: colorLinea }
            ]} />

            {/* Barras con datos de consumo o promedio */}
            <Bar dataKey={claveBarras} fill={colorBarras}>
              <LabelList dataKey={claveBarras} position="top" fontSize={14} fontWeight="bold" />
            </Bar>

            {/* Línea con datos de promedio o consumo */}
            <Line type="monotone" data={datosLinea} dataKey={claveLinea} stroke={colorLinea} strokeWidth={3} dot={{ r: 6 }} />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Información adicional con mensaje dinámico */}
        <div className={styles.infoContainer}>
          <div className={styles.imagenPlaceholder}></div>
          <p className={styles.textoInfo}>{mensajeDinamico}</p>
        </div>
      </div>
    </div>
  );
};

export default GraficoBarras;
