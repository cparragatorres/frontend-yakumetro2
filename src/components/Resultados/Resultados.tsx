import React from "react";
import styles from "./Resultados.module.css";

const Resultados: React.FC<{ onVolver: () => void }> = ({ onVolver }) => {
  return (
    <div className={styles.resultados}>
      <button className={styles.botonVolver} onClick={onVolver}>Volver</button>
      <div className={styles.contenedorDatos}>
        <div className={styles.dato}>100 m³ de consumo en el último mes</div>
        <div className={styles.dato}>Cuenta con medidor</div>
        <div className={styles.dato}>Sin subsidio</div>
      </div>
    </div>
  );
};

export default Resultados;
