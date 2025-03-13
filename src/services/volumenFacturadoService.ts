import axios from "axios";
import { VolumenFacturadoModels } from "../models/VolumenFacturadoModels";

const API_URL = process.env.REACT_APP_API_URL;

export const obtenerVolumenFacturado = async (numeroConexion: string): Promise<VolumenFacturadoModels[] | null> => {
    try {
        console.log(`Consultando API con el número de conexión: ${numeroConexion}`);

        const response = await axios.get<{ volumen_facturado: VolumenFacturadoModels[] }>(`${API_URL}volumen-facturado/${numeroConexion}`);

        console.log("Respuesta de la API:", response.data);
        return response.data.volumen_facturado;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
};
