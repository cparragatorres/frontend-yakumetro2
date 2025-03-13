import React from "react";
import styles from "./Resultados.module.css";
import ConsumoMensual from "../Graficos/ConsumoMensual";
// import ConsumoMensualConDiferencia from "../Graficos/ConsumoMensualConDiferencia";
import ConsumoManzana from "../Graficos/ConsumoManzana";
import ConsumoDistrito from "../Graficos/ConsumoDistrito";
import ConsumoSubsidio from "../Graficos/ConsumoSubsidio";
import { VolumenFacturadoModels } from "../../models/VolumenFacturadoModels";
interface ResultadosProps {
  onVolver: () => void;
  ultimoVolumenFacturado: VolumenFacturadoModels | null; // Puede ser null mientras no haya datos
  modalidadFacturacion: string | null;
  subsidioExiste: number | null;
  numeroConexion: string;
}
const Resultados: React.FC<ResultadosProps> = ({
  onVolver,
  ultimoVolumenFacturado,
  modalidadFacturacion,
  subsidioExiste,
  numeroConexion,
}) => {
  console.log("ultimo volumen facturadossssss: ", ultimoVolumenFacturado?.volumen_facturado);

  return (
    <div className={styles.resultados}>
      <button className={styles.botonVolver} onClick={onVolver}>Volver</button>
      <div className={styles.contenedorDatos}>
        <div className={styles.dato}>
          {ultimoVolumenFacturado?.volumen_facturado != null
            ? `${ultimoVolumenFacturado.volumen_facturado} m³ de consumo en el último mes`
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
        <ConsumoMensual
          numeroConexion={numeroConexion}
          volumenFacturado={ultimoVolumenFacturado}/>
        {/* <ConsumoMensualConDiferencia numeroConexion={numeroConexion}/> */}
        {/* <ConsumoManzana /> */}
        <ConsumoDistrito numeroConexion={numeroConexion}/>
        <ConsumoSubsidio numeroConexion={numeroConexion} />
      </div>
    </div>
  );
};

export default Resultados;
