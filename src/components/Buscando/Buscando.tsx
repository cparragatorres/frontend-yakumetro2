import React from "react";
import styles from "./Buscando.module.css";

const Buscando: React.FC = () => {
  return (
    <div className={styles.buscando} role="status" aria-live="polite">
      <div className={styles.spinner}></div>
      <p>Estamos buscando tu Numero de Conexión...</p>
    </div>
  );
};

export default Buscando;
