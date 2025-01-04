import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al usuario que creó la tarea
        ref: "User", // Nombre del modelo al que se hace referencia
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Task', taskSchema);

/*
    export default mongoose.model("Task", taskSchema);
    ¿Qué hace esto?
    Crea el modelo de Mongoose:

    mongoose.model("Task", taskSchema):
    Task: Nombre del modelo (se utilizará para interactuar con la base de datos).
    taskSchema: El esquema que define la estructura de los documentos.
    MongoDB automáticamente convierte el nombre del modelo (Task) en minúsculas y lo pluraliza al crear la colección. En este caso, la colección sería tasks.
*/