import axios from "axios";
import { ModalidadFacturacionModels } from  "../models/ModalidadFacturacionModels";

const API_URL = process.env.REACT_APP_API_URL;

export const obtenerModalidadFacturacion = async (numeroConexion: string): Promise<ModalidadFacturacionModels | null> => {
  try {
    // console.log(`Consultando API con el número de conexión: ${numeroConexion}`);
    const response = await axios.get<ModalidadFacturacionModels>(`${API_URL}modalidad-facturacion/${numeroConexion}`);
    // console.log("Respuesta de la API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }
}