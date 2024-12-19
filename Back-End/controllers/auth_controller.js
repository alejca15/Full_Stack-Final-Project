const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config");

const iniciarSesion = async (req, res) => {
  const { mail_usuario, contra_usuario } = req.body;
  let Rol = "";
  let Table_id=null
  try {
    // Buscar el usuario por su correo
    const response = await axios.get(`http://localhost:3000/Users`);

    const user = response.data.find((user) => user.mail === mail_usuario);
    console.log("Usuario encontrado",user);

    if (user.athlete_id!=null){
      Rol = "Athletes";
      Table_id=user.athlete_id;
    }
    if (user.mentor_id!=null){
      Rol = "Mentors";
      Table_id=user.mentor_id;
    }
    if (user.counselor_id!=null){
      Rol = "Counselors";
      Table_id= user.counselor_id;
    }
    if (user.admin_id!=null){
      Rol = "Admins";
      Table_id=user.admin_id;
    }
  

    if (!user) {
      return console.log("El usuario no fue encontrado");
    }

    console.log(contra_usuario,user.password);
    
    const esContrasenaValida = await bcrypt.compare(
      contra_usuario,
      user.password
    ); 
    if (!esContrasenaValida) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }
    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, Rol: Rol, Table_id: Table_id },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      }
    );
    res.status(200).json({ token }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesion." });
  }
};

module.exports = {
  iniciarSesion,
};
