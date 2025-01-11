import axios from './axios'

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequets = () => axios.get(`/verify`); // Aquí se exporta la función verityTokenRequets que hace una petición a la API para verificar el token.