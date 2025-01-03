import jwt from "jsonwebtoken"; // (JWT) se utiliza para generar, verificar y decodificar tokens en aplicaciones que implementan autenticación y autorización.
import { TOKEN_SECRET } from "../config.js"; // Importa la clave secreta del archivo de configuración

export function createAccessToken(payload) { // Función para crear un token de acceso
    return new Promise((resolve, reject) => { // Retorna una promesa, resolve es una función que devuelve un valor y reject es una función que devuelve un error
        jwt.sign(
            payload, // Datos que deseas codificar en el token
            TOKEN_SECRET, // Clave secreta
            {
                expiresIn: "1d", // Expira en 1 día
            },
            (err, token) => { // Función de callback
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}

/*
    Funcionamiento de jwt.sign
    La función jwt.sign crea un token JWT basado en:

    payload: Los datos que deseas codificar en el token (por ejemplo, id del usuario, roles, etc.).
    secretOrPrivateKey: Una clave secreta para firmar el token (asegura que solo quienes tienen esta clave puedan verificarlo).
    options (opcional): Configuración adicional, como la expiración del token, el algoritmo de encriptación, etc.
*/