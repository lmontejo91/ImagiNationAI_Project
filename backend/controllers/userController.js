import User from '../mongodb/models/user.js';

//Function to get the user logging in
const loginUser = async (req, res) => {
   res.json({mssg: 'login user'})
    /* try {
      const { email, password } = req.body;

      
      res.status(200).json({ success: true, data: images });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error en el inicio de sesión. Comprueba que tu usuario y/o contraseña son válidos.' });
    } */
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
      
      res.status(200).json({ success: true, user });

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
          res.status(500).json({ success: false, message: 'Error en el registro. Inténtalo de nuevo.' });
      }  
    }
}

export {loginUser, registerUser};