import axios from "axios";
import { ManzanaMensualModel } from "../models/manzanaMensualModels";

const API_URL = process.env.REACT_APP_API_URL;


export const obtenerManzanaMensual = async (numeroConexion: string): Promise<ManzanaMensualModel[] | null> => {
    try {
        // console.log(`Consultando API con el número de conexión: ${numeroConexion}`);

        // Aquí cambiamos el tipo a consumoManzanaModels[], ya que la respuesta es un array
        const response = await axios.get<ManzanaMensualModel[]>(`${API_URL}subsidio-mensual/${numeroConexion}`);

        // console.log("Respuesta de la API:", response.data);
        return response.data;  // Retorna un array de consumoDistritoModels
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
};
