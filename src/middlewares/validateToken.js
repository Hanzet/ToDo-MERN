import jwt from "jsonwebtoken"; // Importa la librería jsonwebtoken
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => { // Middleware para verificar si el usuario está autenticado, req es la solicitud, res es la respuesta y next es la siguiente función de middleware
    const { token } = req.cookies; // Obtiene el token de las cookies

    if (!token)
        return res.status(401).json({ message: "No token, authorization denied" }); // Si no hay token, devuelve un mensaje de error

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(401).json({ message: "Token no válido" }); // Si el token no es válido, devuelve un mensaje de error

        req.user = user; // Guarda el usuario en la solicitud para que las rutas posteriores puedan acceder a él
        next(); // Llama a la siguiente función de middleware
    });
}

/* 
Los middlewares son funciones en aplicaciones web que tienen acceso al objeto de solicitud (req), al
objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuesta de la
aplicación. Estas funciones pueden ejecutar cualquier código, realizar cambios en los objetos de
solicitud y respuesta, finalizar el ciclo de solicitud/respuesta o llamar a la siguiente función de
middleware.

En el contexto de Express.js, los middlewares se utilizan para manejar tareas comunes como la
autenticación, la autorización, el manejo de errores, el análisis de cuerpos de solicitud, entre otros.
*/