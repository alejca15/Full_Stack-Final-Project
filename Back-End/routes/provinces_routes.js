const express = require("express");
const router = express.Router();
const Provinces = require("../controllers/provinces_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Provinces.get_provinces); // Obtener todos las provincias
router.post("/", Provinces.post_province); // Crear Provincia

module.exports = router;