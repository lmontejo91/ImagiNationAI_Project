
import express from "express"; // Importa el framework Express.js para Node.js
import * as dotenv from "dotenv"; // Importa la biblioteca dotenv para cargar variables de entorno desde un archivo .env
import cors from "cors"; // Importa la biblioteca cors para permitir el acceso a recursos de otros dominios en su servidor

import connectDB from "./mongodb/connect.js"; // Importa la función connectDB desde un archivo llamado connect.js, que se utiliza para establecer la conexión con la base de datos MongoDB
import imagesRoutes from "./routes/imagesRoutes.js";
import dalleApiRoutes from "./routes/dalleApiRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Configura el uso de dotenv para cargar las variables de entorno del archivo .env
dotenv.config();

// Crea una instancia de Express y la asigna a una variable llamada app
const app = express();

// Configura el uso de cors en su aplicación Express
app.use(cors());

// Configura el middleware express.json, que se utiliza para analizar el cuerpo de las solicitudes entrantes como JSON.
// El límite de 50 MB se establece para limitar el tamaño del cuerpo de la solicitud.
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/image", imagesRoutes);
app.use("/api/v1/dalleApi", dalleApiRoutes);
app.use("/api/v1/user", userRoutes);

// Define una ruta raíz ("/") en su aplicación Express
// Cuando se accede a esta ruta, se devuelve "Server is working." como respuesta
app.get("/", async (req, res) => {
  res.send("Server is working.");
});

// Esta función asincrónica establece la conexión con la base de datos MongoDB y arranca el servidor web
const startServer = async () => {
  try {
    // Establece la conexión con la base de datos MongoDB utilizando la función connectDB importada anteriormente.
    // La URL de la base de datos se pasa como argumento utilizando una variable de entorno. Las variables de entorno son cargadas gracias a la librería dotenv en el objeto process.env (process es una variable global en Node.js)
    connectDB(process.env.MONGODB_URL);

    // Arranca el servidor web en el puerto 8080 y muestra un mensaje en la consola
    app.listen(8080, () => console.log("Listening on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

// Llama a la función startServer para arrancar el servidor web
startServer();

