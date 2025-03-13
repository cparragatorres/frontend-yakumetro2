import axios from "axios";
import { SubsidioMensualModels } from "../models/subsidioMensualModels";

const API_URL = process.env.REACT_APP_API_URL;

export const obtenerSubsidioMensual = async (numeroConexion: string): Promise<SubsidioMensualModels[] | null> => {
    try {
        // console.log(`Consultando API con el número de conexión: ${numeroConexion}`);

        // Aquí cambiamos el tipo a consumoDistritoModels[], ya que la respuesta es un array
        const response = await axios.get<SubsidioMensualModels[]>(`${API_URL}subsidio-mensual/${numeroConexion}`);

        // console.log("Respuesta de la API:", response.data);
        return response.data;  // Retorna un array de consumoDistritoModels
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
};
