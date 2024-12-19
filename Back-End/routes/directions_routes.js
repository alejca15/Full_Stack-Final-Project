const express = require("express");
const router = express.Router();
const Directions = require("../controllers/directions_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Directions.get_directions); // Obtener todas las direcciones
router.post("/", Directions.post_direction); // Crear dirección
router.put("/:id", Directions.update_direction); // Actualizar dirección
router.delete("/:id", Directions.delete_direction); // Eliminar dirección

module.exports = router;