const express = require('express');
const  IniciarSesion  = require("../controllers/auth_controller");
const router = express.Router();

// Ruta para iniciar sesion
router.post('/login', IniciarSesion.iniciarSesion);

module.exports = router;