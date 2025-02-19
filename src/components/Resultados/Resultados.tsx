import React from "react";
import styles from "./Resultados.module.css";
import ConsumoMensual from "../Graficos/ConsumoMensual";
import ConsumoManzana from "../Graficos/ConsumoManzana";
import ConsumoDistrito from "../Graficos/ConsumoDistrito";
import ConsumoSubsidio from "../Graficos/ConsumoSubsidio";

const Resultados: React.FC<{ onVolver: () => void }> = ({ onVolver }) => {
  return (
    <div className={styles.resultados}>
      <button className={styles.botonVolver} onClick={onVolver}>Volver</button>
      <div className={styles.contenedorDatos}>
        <div className={styles.dato}>100 m³ de consumo en el último mes</div>
        <div className={styles.dato}>Cuenta con medidor</div>
        <div className={styles.dato}>Sin subsidio</div>
      </div>

      {/* Sección de gráficos */}
      <div className={styles.graficos}>
        <ConsumoMensual />
        <ConsumoManzana />
        <ConsumoDistrito />
        <ConsumoSubsidio />
      </div>
    </div>
  );
};

export default Resultados;
