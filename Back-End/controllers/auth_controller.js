const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config");

const iniciarSesion = async (req, res) => {
  const { mail_usuario, contra_usuario } = req.body;
  try {
    // Buscar el usuario por su nombre de usuario
    const [Athlete, Mentor, Counselor, Admin] = await Promise.all([
      axios.get(`http://localhost:3000/Athletes?mail=${mail_usuario}`),
      axios.get(`http://localhost:3000/Mentors?mail=${mail_usuario}`),
      axios.get(`http://localhost:3000/Counselors?mail=${mail_usuario}`),
      axios.get(`http://localhost:3000/Admins?mail=${mail_usuario}`),
    ]);

    const usuarios = Athlete.data || Mentor.data || Counselor.data || Admin.data;
    const usuario = usuarios.find(user => {
      return user.mail === mail_usuario;
    });

    console.log("Este es el usuario",usuario);
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }
    // Aqui deberfas comparar la contrasena proporcionada con la almacenada
    const esContrasenaValida = await bcrypt.compare(
      contra_usuario,
      usuario.password
    ); // Asegurate de tener bcrypt instalado
    if (!esContrasenaValida) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }
    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id, mail_usuario: usuario.mail },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      }
    );
    res.status(200).json({ token }); // Devolver el token al cliente
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesion." });
  }
};

module.exports = {
  iniciarSesion,
};
