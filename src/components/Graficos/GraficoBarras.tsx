import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import styles from "./GraficoBarras.module.css";

interface GraficoBarrasProps {
  titulo: string;
  datos: any[];
  color: string;
}

const GraficoBarras: React.FC<GraficoBarrasProps> = ({ titulo, datos, color }) => {
  return (
    <div className={styles.contenedor}>
      <h3 className={styles.titulo} style={{ backgroundColor: color }}>{titulo}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consumo" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoBarras;
