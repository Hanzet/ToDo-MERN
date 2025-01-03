import User from "../models/user.model.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({
            username,
            email,
            password
        });

        const userSaved = await newUser.save();
        res.json(userSaved);
    } catch (error) {
        console.error(error);
    }
}

export const login = (req, res) => res.send("Login");