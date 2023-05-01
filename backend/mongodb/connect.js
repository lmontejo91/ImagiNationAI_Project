import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true); //Esta opción controla si Mongoose debe lanzar un error si se realiza una consulta con campos que no están definidos en el esquema.

  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

export default connectDB;
