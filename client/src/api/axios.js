import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api', // Aquí se define la URL base de la API. (Dominio base al que siempre va a consultar)
    withCredentials: true, // Aquí se habilitan las credenciales.
})

export default instance;