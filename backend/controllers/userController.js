import User from '../mongodb/models/user.js';
import JWT from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import * as dotenv from 'dotenv';

dotenv.config();

const createToken = (_id) => {
   return JWT.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

//Function to get the user logged in
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Verifica que los campos no estén vacíos
      if (!email || !password) {
        throw Error('Los campos no pueden estar vacíos');
      }

      // Verifica si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }

      // Verifica si la contraseña es correcta
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }

      // Crea un token para el usuario
      const token = createToken(user._id);

      // Devuelve el usuario y el token
      const userWithoutPsswd = user.toObject();
      delete userWithoutPsswd.password; //Elimina la propiedad password del objeto userWithoutPsswd que se va a enviar como respuesta al cliente (no borra de la bbdd).
      res.status(200).json({ success: true, user: userWithoutPsswd, token });  

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
}

//Function to REGISTER a new user
const registerUser = async (req, res) => {

    try {
      const { name, email, password } = req.body;

      // Creamos una nueva instancia del modelo User con los datos del usuario
      const newUser = new User({
        name,
        email,
        password
      });
      
      // Guardamos el usuario en la base de datos
      const user = await newUser.save();
      
      //Creamos un token para permitir realizar operaciones al usuario autenticado (ya que tras el registro se logeará automáticamente)
      const token = createToken(user._id);
      const userWithoutPsswd = await User.findById(user._id).select('-password');

      res.status(200).json({ success: true, user: userWithoutPsswd, token });

    } catch (err) {
      if (err.code === 11000) { // El código 11000 se usa para errores de clave duplicada
          res.status(409).json({ success: false, message: 'El nombre de usuario o el correo electrónico ya están en uso.' });
      }else if (err.name === "ValidationError"){
        const errorsValidation = {};
        for(let error in err.errors){
          errorsValidation[error] = err.errors[error].message;
        }
        res.status(400).json({ success: false, errorsValidation});  
      }else {
          res.status(500).json({ success: false, message: err.message });
      }  
    }
}

//Function to get the user logged out
const logoutUser = async (req, res) => {
  const { authorization } = req.headers;

  // Verificar que el token de autorización esté presente y sea válido
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'No se proporcionó un token de autorización válido' });
  }

  try {
    const token = authorization.split(' ')[1];

    // Verificar y decodificar el token JWT
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    
    // Si el token es válido, el usuario está autenticado y se puede cerrar sesión
    return res.status(200).send({ message: 'Sesión cerrada correctamente' });
  } catch (err) {
    // Si el token no es válido, devolver un error de autenticación
    return res.status(401).send({ message: 'No se proporcionó un token de autorización válido' });
  }
}

//Function to get the user from the token
const getUserFromToken = async (token) => {
  console.log("ENTRA Recuperar User");
  try {
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const userId = decodedToken._id;
    const user = await User.findById(userId).select('-password');
    return user;
  } catch (err) {
    console.log("DA ERROR");
    return null;
  }
};

export {loginUser, registerUser, logoutUser, getUserFromToken};