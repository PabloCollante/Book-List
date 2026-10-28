import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const app = express();
const PORT = 3000;

//directorio del archivo
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(currentDir, "uploads");

//crea uploads si todavia no existe
mkdirSync(uploadsDir, { recursive: true })

// permite que el front de vite lea las respuestas de la api
app.use(
    cors({
        origin: "http://localhost:5173"
    }),
);

//procesa cuerpos json y limita su tamanio
app.use(express.json({ limit: "100kb" }));

//publica las portadas bajo /uploads
app.use("/uploads", express.static(uploadsDir));

//comprueba que el servidor HTTP este disponible
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        message: "API de Book-List funcionando"
    });
});

//las rutas de los libros se registraran aqui, antes del 404    

//respuestas para rutas existentes
app.use((_req, res) => {
    res.status(400).json({
        error: "Ruta no encontrada",
    });
});

// el middleware de errores debe quedar despues de las rutas.
app.use((err, _req, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.log(err);

    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ error: "El Json enviado no es valido" })
    }

    if (err.type === "entity.too.large") {
        return res.status(413).json({ error: "El cuerpo de la solicitud es demasiado grande" })
    }

    return res.status(500).json({
        error: "Error interno del servidor",
    });
});

app.listen(PORT, () => {
    console.log(`Book-List API: http://localhost:${PORT}`)
});


