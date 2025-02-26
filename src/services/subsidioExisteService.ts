import axios from "axios";
import { SubsidioExisteModels } from "../models/SubsidioExisteModels";

const API_URL = process.env.REACT_APP_API_URL;

export const obtenerSubsidioExiste = async (numeroConexion: string): Promise<SubsidioExisteModels | null> => {
    try {
        console.log(`Consultando API con el número de conexión: ${numeroConexion}`);
        const response = await axios.get<SubsidioExisteModels>(`${API_URL}subsidio-existe/${numeroConexion}`);
        console.log("Respuesta de la API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
};
