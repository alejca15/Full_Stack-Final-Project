const express = require("express");
const router = express.Router();
const Directions = require("../controllers/directions_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Directions.get_directions); // Obtener todos las direcciones
router.post("/", Directions.post_direction ); // Crear direcciones

module.exports = router;