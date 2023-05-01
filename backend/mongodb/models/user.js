import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
      type: String, 
      required: [true, "El campo 'nombre de usuario' es obligatorio."], 
      unique: true, 
      minlength:[3, "El nombre debe tener al menos {MINLENGTH} caracteres."], 
      maxlength: [30, "El nombre no puede tener más de {MAXLENGTH} caracteres."]
    },
    email:{
      type: String, 
      required: [true, "El campo 'email' es obligatorio."], 
      unique: true,
      validate: {
      validator: function (v) {
          return validator.isEmail(v);
      },
      message: props => `${props.value} no es un email válido.`
      }
    },
    password:{
      type: String, 
      required:true,
      validate: {
        validator: function (v) {
            // Validar que la contraseña sea lo suficientemente fuerte (longitud mínima de 8 caracteres y contenga al menos una letra mayúscula, una letra minúscula, un número y un carácter especial)
            return validator.isStrongPassword(v, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false // Si se establece en true, el método devolverá un objeto con información adicional sobre la fortaleza de la contraseña
            });
        },
        message: props => `La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.`
      }
    },
});

//FUNCIÓN PREVIA AL GUARDADO DE LA COLECCIÓN EN MONGODB PARA ENCRIPTAR PASSWORD
userSchema.pre("save", async function (next) {  //'next' es un callback que se utiliza para indicar que el middleware ha terminado de ejecutarse y que la ejecución debe continuar con la siguiente función en la cadena de middleware. En este caso, la siguiente función sería la función 'save'.
    // Sólo si la contraseña ha sido modificada o es un nuevo usuario, la encriptamos
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
});

const User = mongoose.model('User', userSchema);

export default User;