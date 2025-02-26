import axios from "axios";
import { ConsumoMensualModels } from "../models/consumoMensualModels";

const API_URL = process.env.REACT_APP_API_URL;

export const obtenerConsumoMensual = async (numeroConexion: string): Promise<ConsumoMensualModels[] | null> => {
    try {
        console.log(`Consultando API con el número de conexión: ${numeroConexion}`);

        // Aquí cambiamos el tipo a ConsumoMensualModels[], ya que la respuesta es un array
        const response = await axios.get<ConsumoMensualModels[]>(`${API_URL}consumo-mensual/${numeroConexion}`);

        console.log("Respuesta de la API:", response.data);
        return response.data;  // Retorna un array de ConsumoMensualModels
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
};
