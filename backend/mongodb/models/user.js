import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
    name:{type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true},
});

//FUNCIÓN PREVIA AL GUARDADO DE LA COLECCIÓN EN MONGODB PARA ENCRIPTAR PASSWORD
/* User.pre("save", async function (next) {
    // Sólo si la contraseña ha sido modificada, la encriptamos
    if (this.isModified("password")) {
      try {
        // Generamos un salt (un valor aleatorio para añadir seguridad) con 10 rounds (recomendado)
        const salt = await bcrypt.genSalt(10);
        // Ciframos la contraseña usando el salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Sobreescribimos la contraseña en texto claro con la cifrada
        this.password = hashedPassword;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
}); */

const UserSchema = mongoose.model('User', User);

export default UserSchema;