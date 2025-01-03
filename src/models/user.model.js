import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, // Elimina espacios en blanco al principio y al final del valor.
    },
    email: {
        type: String,
        required: true,
        trim: true, // Elimina espacios innecesarios.
        unique: true, // Se asegura de que no haya dos documentos en la colección con el mismo valor en el campo email.
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Añade dos campos al documento: createdAt y updatedAt.
});

export default mongoose.model("User", userSchema);

/*
    export default mongoose.model("User", userSchema);
    ¿Qué hace esto?
    Crea el modelo de Mongoose:

    mongoose.model("User", userSchema):
    User: Nombre del modelo (se utilizará para interactuar con la base de datos).
    userSchema: El esquema que define la estructura de los documentos.
    MongoDB automáticamente convierte el nombre del modelo (User) en minúsculas y lo pluraliza al crear la colección. En este caso, la colección sería users.
*/