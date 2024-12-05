const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config");

const iniciarSesion = async (req, res) => {
  const { mail_usuario, contra_usuario } = req.body;
  let Table_name = "";
  try {
    // Buscar el usuario por su nombre de usuario
    const [Athlete, Mentor, Counselor, Admin] = await Promise.all([
      axios.get(`http://localhost:3000/Athletes`),
      axios.get(`http://localhost:3000/Mentors`),
      axios.get(`http://localhost:3000/Counselors`),
      axios.get(`http://localhost:3000/Admins`),
    ]);

    //Validamos si es Atleta
    const is_Athlete = Athlete.data.find((user) => {
      if (user.mail === mail_usuario) {
        Table_name = "Athletes";
        return user;
      }
    });

    //Validamos si es Mentor
    const is_Mentor = Mentor.data.find((user) => {
      if (user.mail === mail_usuario) {
        Table_name = "Mentors";
        return user;
      }
    });

    //Validamos si es Counselor
    const is_Counselor = Counselor.data.find((user) => {
      if (user.mail === mail_usuario) {
        Table_name = "Counselors";
        return user;
      }
    });

    //Validamos si es Admin
    const is_Admin = Admin.data.find((user) => {
      if (user.mail === mail_usuario) {
        Table_name = "Admins";
        return user;
      }
    });

    const usuario=is_Athlete||is_Mentor||is_Counselor||is_Admin

    if (!usuario) {
      return console.log("El usuario no fue encontrado");
    }

    const esContrasenaValida = await bcrypt.compare(
      contra_usuario,
      usuario.password
    ); 
    if (!esContrasenaValida) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }
    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id, Rol: Table_name },
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
