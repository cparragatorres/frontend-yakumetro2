import React from "react";
import styles from "./Resultados.module.css";
import ConsumoMensual from "../Graficos/ConsumoMensual";
// import ConsumoMensualConDiferencia from "../Graficos/ConsumoMensualConDiferencia";
import ConsumoManzana from "../Graficos/ConsumoManzana";
import ConsumoDistrito from "../Graficos/ConsumoDistrito";
import ConsumoSubsidio from "../Graficos/ConsumoSubsidio";
interface ResultadosProps {
  onVolver: () => void;
  volumenFacturado: number | null; // Puede ser null mientras no haya datos
  modalidadFacturacion: string | null;
  subsidioExiste: number | null;
  numeroConexion: string;
}
const Resultados: React.FC<ResultadosProps> = ({
  onVolver,
  volumenFacturado,
  modalidadFacturacion,
  subsidioExiste,
  numeroConexion,
}) => {
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
        <ConsumoMensual numeroConexion={numeroConexion}/>
        {/* <ConsumoMensualConDiferencia numeroConexion={numeroConexion}/> */}
        {/* <ConsumoManzana /> */}
        <ConsumoDistrito numeroConexion={numeroConexion}/>
        <ConsumoSubsidio numeroConexion={numeroConexion} />
      </div>
    </div>
  );
};

export default Resultados;
