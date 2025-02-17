import React from "react";
import styles from "./InformacionAgua.module.css";
import infoAgua from "../../assets/informacion-agua.png";

const InformacionAgua: React.FC = () => {
  return (
    <div className={styles.contenedor}>
      <img src={infoAgua} alt="Información sobre el agua potable" className={styles.imagen} />
    </div>
  );
};

export default InformacionAgua;
