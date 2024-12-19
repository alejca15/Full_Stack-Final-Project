const express = require("express");
const router = express.Router();
const Addresses = require("../controllers/addresses_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Addresses.get_addresses); // Obtener todas las direcciones
router.post("/", Addresses.post_addresses); // Crear dirección
router.delete("/:id", Addresses.delete_address); // Eliminar dirección
router.put("/:id", Addresses.update_address); // Actualizar dirección

module.exports = router;