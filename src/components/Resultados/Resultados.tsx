import React from "react";
import styles from "./Resultados.module.css";
import ConsumoMensual from "../Graficos/ConsumoMensual";
import ConsumoManzana from "../Graficos/ConsumoManzana";
import ConsumoDistrito from "../Graficos/ConsumoDistrito";
import ConsumoSubsidio from "../Graficos/ConsumoSubsidio";
interface ResultadosProps {
  onVolver: () => void;
  volumenFacturado: number | null; // Puede ser null mientras no haya datos
  modalidadFacturacion: string | null;
  subsidioExiste: number | null;
}
const Resultados: React.FC<ResultadosProps> = ({ onVolver, volumenFacturado, modalidadFacturacion, subsidioExiste }) => {
  return (
    <div className={styles.resultados}>
      <button className={styles.botonVolver} onClick={onVolver}>Volver</button>
      <div className={styles.contenedorDatos}>
        <div className={styles.dato}>
          {volumenFacturado != null
            ? `${volumenFacturado} m³ de consumo en el último mes`
            : "No existe volumen facturado"}
        </div>
        <div className={styles.dato}>
          Modalidad de Facturación: {modalidadFacturacion?.trim() ? modalidadFacturacion : "..."}
        </div>
        <div className={styles.dato}>
          {subsidioExiste != null
            ? subsidioExiste === 1
              ? "Con Subsidio"
              : "Sin Subsidio"
            : "Estado de subsidio no disponible"
          }
        </div>
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
