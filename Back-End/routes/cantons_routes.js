const express = require("express");
const router = express.Router();
const Cantons = require("../controllers/cantons_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Cantons.get_cantons); // Obtener todos los cantones
router.post("/", Cantons.post_cantons ); // Crear canton

module.exports = router;