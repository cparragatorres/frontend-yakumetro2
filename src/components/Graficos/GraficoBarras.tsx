import React from "react";
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
import styles from "./GraficoBarras.module.css";

interface GraficoBarrasProps {
  titulo: string;
  datosBarras: any[];
  datosLinea: any[];
  colorBarras: string;
  colorLinea: string;
  mensajeDinamico: React.ReactNode;
  claveBarras: string;
  claveLinea: string;
}

const GraficoBarras: React.FC<GraficoBarrasProps> = ({
  titulo, datosBarras, datosLinea, colorBarras, colorLinea, mensajeDinamico, claveBarras, claveLinea
}) => {
  return (
    <div className={styles.contenedor}>
      <h3 className={styles.titulo} style={{ backgroundColor: colorBarras }}>{titulo}</h3>
      <div className={styles.graficoContainer}>
        <ResponsiveContainer width="70%" height={300}>
          <ComposedChart data={datosBarras} margin={{ top: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Barras con datos de consumo o promedio */}
            <Bar dataKey={claveBarras} fill={colorBarras}>
              <LabelList dataKey={claveBarras} position="top" fontSize={14} fontWeight="bold" />
            </Bar>

            {/* Línea con datos de promedio o consumo */}
            <Line type="monotone" dataKey={claveLinea} stroke={colorLinea} strokeWidth={3} dot={{ r: 5 }} />

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
