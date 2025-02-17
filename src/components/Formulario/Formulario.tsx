import React, { useState } from "react";
import styles from "./Formulario.module.css";

const Formulario: React.FC<{ onBuscar: () => void }> = ({ onBuscar }) => {
  const [departamento, setDepartamento] = useState("");
  const [eps, setEps] = useState("");
  const [numeroConexion, setNumeroConexion] = useState("");
  const [errorMensaje, setErrorMensaje] = useState("");

  // Validar solo 8 dígitos en el input
  const handleNumeroConexionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,8}$/.test(value)) {
      setNumeroConexion(value);
    }
  };

  // Validación antes de ejecutar la búsqueda
  const validarFormulario = () => {
    if (!departamento) {
      setErrorMensaje("Debe seleccionar su departamento.");
      return false;
    }

    if (!eps) {
      setErrorMensaje("Debe seleccionar su EPS.");
      return false;
    }

    if (numeroConexion.length !== 8) {
      setErrorMensaje("El número de conexión debe ser de 8 dígitos.");
      return false;
    }

    setErrorMensaje(""); // Limpiar mensaje si todo está correcto
    return true;
  };

  // Acción al presionar "Buscar"
  const handleBuscar = () => {
    if (validarFormulario()) {
      console.log("Búsqueda realizada con éxito");
      console.log("Departamento:", departamento);
      console.log("EPS:", eps);
      console.log("Número de Conexión:", numeroConexion);
    }
  };

  return (
    <div className={styles.formulario}>
      <div className={styles.fila}>

        <div className={styles.campo}>
          <label>Departamento</label>
          <select value={departamento} onChange={(e) =>setDepartamento(e.target.value)}>
            <option value="">Elija su Departamento</option>
            <option value="Lima">Lima</option>
          </select>
        </div>

        <div className={styles.campo}>
          <label>EPS</label>
          <select value={eps} onChange={(e) => setEps(e.target.value)}>
            <option value="">¿A qué EPS pertenece?</option>
            <option value="SEDAPAL">SEDAPAL</option>
          </select>
        </div>

        <div className={styles.campo}>
          <label># Conexión</label>
          <input
            type="text"
            value={numeroConexion}
            onChange={handleNumeroConexionChange}
            placeholder="••••••••"
            maxLength={8}
          />
        </div>
      </div>

      <button onClick={onBuscar}>Buscar</button>

      {/* Mostrar error debajo del botón */}
      {errorMensaje && <p className={styles.error}>{errorMensaje}</p>}

    </div>
  );
};

export default Formulario;
