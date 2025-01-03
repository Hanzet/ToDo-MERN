import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';

const app = express(); /* Es una instancia de la aplicación de Express. 
    Es el núcleo de tu servidor, y en esta instancia defines:
    Los middlewares.
    Las rutas.
    La configuración del servidor.
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

app.use("/api", authRoutes);
/* 
    ¿Qué hace esto?
    app.use(): Registra un middleware o rutas en la aplicación.
    "/api": Especifica un prefijo para las rutas definidas en authRoutes. Todas las rutas de authRoutes estarán precedidas por /api.
*/

export default app;