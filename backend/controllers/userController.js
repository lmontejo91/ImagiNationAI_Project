import User from '../mongodb/models/user.js';
import Image from '../mongodb/models/image.js';
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
      const errorsValidation = {};
      
      // Verifica que los campos no estén vacíos
      if (!email || !password) {
        throw Error('Los campos no pueden estar vacíos');
      }

      // Verifica si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        errorsValidation.email = 'Email de usuario no encontrado';
        return res.status(404).json({ success: false, errorsValidation });
      }

      // Verifica si la contraseña es correcta
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        errorsValidation.password = 'Contraseña incorrecta';
        return res.status(401).json({ success: false, errorsValidation });
      }

      // Crea un token para el usuario
      const token = createToken(user._id);

      // Devuelve el usuario y el token
      const userWithoutPsswd = user.toObject();
      delete userWithoutPsswd.password; //Elimina la propiedad password del objeto userWithoutPsswd que se va a enviar como respuesta al cliente (no borra de la bbdd).
      res.status(200).json({ success: true, user: userWithoutPsswd, token });  

    } catch (err) {
      errorsValidation.general = err.message;
      res.status(500).json({ success: false, errorsValidation });
    }
}

//Function to REGISTER a new user
const registerUser = async (req, res) => {

    try {
      const { firstname, lastname, username, email, password } = req.body;

      // Creamos una nueva instancia del modelo User con los datos del usuario
      const newUser = new User({
        firstname,
        lastname,
        username,
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
      const errorsValidation = {};
      if (err.code === 11000) { // El código 11000 se usa para errores de clave duplicada
        errorsValidation.general = 'El nombre de usuario o el correo electrónico ya están en uso.'
        res.status(409).json({ success: false, errorsValidation });
      }else if (err.name === "ValidationError"){ 
        for(let error in err.errors){
          errorsValidation[error] = err.errors[error].message;
        }
        res.status(400).json({ success: false, errorsValidation});  
      }else {
          errorsValidation.general = err.message;
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

const updateUserData = async (req, res) => {
  const { userId } = req.params;
  const { firstname, lastname, username, email, password } = req.body;
  const updateFields = {};
  console.log("LLEGA:");
  console.log(req.body);
  console.log("User Id: "+userId);
  if (firstname)
    updateFields.firstname = firstname;

  if (lastname)
    updateFields.lastname = lastname;
  
  if (username)
    updateFields.username = username;

  if (email)
    updateFields.email = email;

  /* if (password)
    updateFields.password = await bcrypt.hash(password, 10); */

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    console.log("UPDATED:");
    console.log(updatedUser);
    const user = await User.findById(userId);
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const userWithoutPsswd = updatedUser.toObject();
    delete userWithoutPsswd.password;

    res.status(200).json({ success: true, user: userWithoutPsswd });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al actualizar los datos del usuario' });
  }
};

const deleteUserAccount = async (req, res) => {
  const { userId } = req.params;
  console.log("LLEGA");
  console.log(userId);
  try {
    // Eliminar las imágenes asociadas al usuario
    await Image.deleteMany({ user: userId });
    console.log("BORRA IMÁGENES");
    // Eliminar al usuario
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("BORRA USER");
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User account deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Error deleting user account' });
  }
};

const getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtener el ID del usuario de los parámetros de la solicitud
    let likeCount = 0;

    const imageCount = await Image.countDocuments({ user: userId }); // Contar las imágenes asociadas al usuario

    if (imageCount !== 0) {
      const userImages = await Image.find({ user: userId }); // Obtener las imágenes asociadas al usuario
      likeCount = userImages.reduce((totalLikes, image) => totalLikes + image.likes, 0); // Calcular el total de likes de las imágenes
    }
    
    res.status(200).json({ success: true, imageCount, likeCount });
  } catch (error) {
    console.error("Error retrieving user image stats:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export { loginUser, registerUser, logoutUser, getUserFromToken, updateUserData, deleteUserAccount, getUserStats };
