// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const Users_services = require("../controllers/users_controller");

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
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido." });
  }
};



module.exports = { verifyToken };
