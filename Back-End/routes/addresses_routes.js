const express = require("express");
const router = express.Router();
const Addresses = require("../controllers/addresses_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Addresses.get_addresses); // Obtener todos las Direcciones completas
router.post("/", Addresses.post_addresses ); // Crear Direcciones completa

module.exports = router;