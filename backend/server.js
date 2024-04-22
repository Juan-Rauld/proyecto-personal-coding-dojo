// Importando librerías
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Importando rutas
import usuarioRoutes from "./routes/usuario.routes.js";

// Creando el servidor
const app = express();

// Configuración del servidor
app.use(cors());
app.use(express.json());
app.use(usuarioRoutes);
app.listen(8080);

// Conectando el servidor con MongoDB
mongoose.connect("mongodb+srv://jarauldidiaquez:JhTry2wWSAPfBjjL@cluster0.ojeebql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión lograda. Base de datos: [puerto 8080]"))
    .catch((e) => console.log("Error", e));


    /* jarauldidiaquez */
    /* JhTry2wWSAPfBjjL */