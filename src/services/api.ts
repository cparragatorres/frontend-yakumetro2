import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const testConexion = async () => {
  try {
      console.log("Intentando conectar con la API...");
      const response = await axios.get(`${API_URL}/ultimo-importe-total/2000043`);
      console.log("Respuesta de la API:", response.data);
  } catch (error) {
      console.error("Error en la solicitud:", error);
  }
};
