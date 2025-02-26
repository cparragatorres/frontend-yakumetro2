import React from "react";
import styles from "./Resultados.module.css";
import ConsumoMensual from "../Graficos/ConsumoMensual";
import ConsumoManzana from "../Graficos/ConsumoManzana";
import ConsumoDistrito from "../Graficos/ConsumoDistrito";
import ConsumoSubsidio from "../Graficos/ConsumoSubsidio";
interface ResultadosProps {
  onVolver: () => void;
  volumenFacturado: number | null; // Puede ser null mientras no haya datos
}
const Resultados: React.FC<ResultadosProps> = ({ onVolver, volumenFacturado }) => {
  return (
    <div className={styles.resultados}>
      <button className={styles.botonVolver} onClick={onVolver}>Volver</button>
      <div className={styles.contenedorDatos}>
        <div className={styles.dato}>
          {volumenFacturado !== null ? `${volumenFacturado} m³ de consumo en el último mes` : "Cargando datos..."}
        </div>
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
