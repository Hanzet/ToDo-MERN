import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';

const app = express(); /* Es una instancia de la aplicación de Express. 
    Es el núcleo de tu servidor, y en esta instancia defines:
    Los middlewares.
    Las rutas.
    La configuración del servidor.
*/

app.use(cors({
    origin: 'http://localhost:5173', // URL de tu aplicación cliente.
    credentials: true // Habilita las credenciales para el intercambio de recursos entre dominios.
}));
/*
    ¿Qué hace esto?
    cors(): Es un middleware que permite que los recursos de tu servidor sean accedidos por un dominio diferente.
    Esto es necesario para que tu aplicación cliente pueda comunicarse con tu servidor.
*/

app.use(morgan('dev'));
/*
    ¿Qué es un middleware?
    Un middleware es una función que procesa las solicitudes HTTP antes de que lleguen a tus rutas definidas o al controlador.
    El formato 'dev' muestra:
        Método HTTP (GET, POST, etc.).
        URL de la solicitud.
        Código de estado de la respuesta.
        Tiempo de respuesta en milisegundos.
*/

app.use(express.json());
/*
    ¿Qué hace esto?
    express.json(): Es un middleware integrado en Express que analiza las solicitudes entrantes con cargas JSON y las almacena en req.body.
    Esto permite que tu aplicación procese solicitudes JSON.
*/

app.use(cookieParser());
/*
    ¿Qué hace esto?
    cookieParser(): Es un middleware que analiza las cookies de la solicitud y las almacena en req.cookies.
    Esto permite que tu aplicación procese cookies.
*/

app.use("/api", authRoutes);
/* 
    ¿Qué hace esto?
    app.use(): Registra un middleware o rutas en la aplicación.
    "/api": Especifica un prefijo para las rutas definidas en authRoutes. Todas las rutas de authRoutes estarán precedidas por /api.
*/

app.use("/api", taskRoutes);
/* 
    ¿Qué hace esto?
    app.use(): Registra un middleware o rutas en la aplicación.
    "/api": Especifica un prefijo para las rutas definidas en taskRoutes. Todas las rutas de taskRoutes estarán precedidas por /api.
*/

export default app;