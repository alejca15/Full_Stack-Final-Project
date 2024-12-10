// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const Admins_services = require("../controllers/admins_controller");
const Mentors_services = require("../controllers/mentors_controller");
const Athlete_services = require("../controllers/athletes_controller");
const Counselors_serivces = require("../controllers/counselors_controller");

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.usuario = decoded; // Guardar la información del usuario en la request, informacion ya decodificada
    verify_role(decoded.mail, res);
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido." });
  }
};



const verify_role = async (mail, res) => {
  // Redireccion a Mentors
  const Mentors = await Mentors_services.get_mentors();
  const is_mentor = Mentors.find((user) => user.mail === mail);
  if (is_mentor) {
    return res.redirect("http://localhost:5173/Mentor");
  }

  // Redireccion a Atletas
  const Athletes = await Athlete_services.get_athletes();
  const is_athlete = Athletes.find((user) => user.mail === mail);
  if (is_athlete) {
    return res.redirect("http://localhost:5173/Athlete");
  }

  // Redireccion a Admins
  const Admins = await Admins_services.get_admins();
  const is_admin = Admins.find((user) => user.mail === mail);
  if (is_admin) {
    return res.redirect("http://localhost:5173/Admin");
  }

  // Si no se encuentra el usuario
  return res
    .status(404)
    .json({ error: "Usuario no encontrado en ninguna tabla." });
};

module.exports = { verifyToken, verify_role };
