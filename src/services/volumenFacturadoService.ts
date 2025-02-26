import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const obtenerVolumenFacturado = async (numeroConexion: string) => {
    try {
        console.log(`Consultando API con el número de conexión: ${numeroConexion}`);
        const response = await axios.get(`${API_URL}volumen-facturado/${numeroConexion}`);
        console.log("Respuesta de la API:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
};
