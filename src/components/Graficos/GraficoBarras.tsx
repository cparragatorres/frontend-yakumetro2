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
  datos: any[];
  colorBarras: string;
  colorLinea: string;
  keyBarras: string;
  keyLinea: string;
  mensajeDinamico: React.ReactNode;
}

const GraficoBarras: React.FC<GraficoBarrasProps> = ({
  titulo, datos, colorBarras, colorLinea, keyBarras, keyLinea, mensajeDinamico
}) => {
  return (
    <div className={styles.contenedor}>
      <h3 className={styles.titulo} style={{ backgroundColor: colorBarras }}>{titulo}</h3>
      <div className={styles.graficoContainer}>
        <ResponsiveContainer width="60%" height={300}>
          <ComposedChart data={datos} margin={{ top: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Barras con etiquetas */}
            <Bar dataKey={keyBarras} fill={colorBarras} >
              <LabelList dataKey={keyBarras} position="top" fontSize={14} fontWeight="bold" />
            </Bar>

            {/* Línea del promedio */}
            <Line type="monotone" dataKey={keyLinea} stroke={colorLinea} strokeWidth={3} dot={{ r: 5 }}/>

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
