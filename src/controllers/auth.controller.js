import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => { // Registra un nuevo usuario
    const { username, email, password } = req.body; // Obtiene los datos del usuario desde el cuerpo de la petición

    try {
        const passwordHash = await bcrypt.hash(password, 10); // Encripta la contraseña

        const newUser = new User({ // Crea un nuevo usuario
            username,
            email,
            password: passwordHash, // Guarda la contraseña encriptada
        });

        const userSaved = await newUser.save(); // Guarda el usuario en la base de datos
        const token = await createAccessToken({ id: userSaved._id }); // Crea un token de acceso

        res.cookie('token', token) // Guarda el token en una cookie, el token puedo observarlo en el "Header o Cookies"
        res.json({ // Devuelve un JSON con los datos del usuario registrado
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => { // Inicia sesión de un usuario
    const { email, password } = req.body; // Obtiene los datos del usuario desde el cuerpo de la petición

    try {
        const userFound = await User.findOne({ email }); // Busca un usuario por su email
        if (!userFound) return res.status(400).json({ message: "User not found" }); // Si no encuentra al usuario, devuelve un mensaje de error

        const isMatch = await bcrypt.compare(password, userFound.password); // Compara la contraseña ingresada con la contraseña encriptada del usuario
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" }); // Si las contraseñas no coinciden, devuelve un mensaje de error

        const token = await createAccessToken({ id: userFound._id }); // Crea un token de acceso

        res.cookie('token', token) // Guarda el token en una cookie, el token puedo observarlo en el "Header o Cookies"
        res.json({ // Devuelve un JSON con los datos del usuario registrado
            id: userFound._id, // Devuelve el ID del usuario
            username: userFound.username, // Devuelve el nombre de usuario
            email: userFound.email, // Devuelve el email del usuario
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}

export const profile = async (req, res) => { // Obtiene el perfil de un usuario
    const userFound = await User.findById(req.user.id); // Busca un usuario por su ID

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" }); // Si no encuentra al usuario, devuelve un mensaje de error

    return res.json({ // Devuelve un JSON con los datos del usuario
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}