const express = require("express");
const router = express.Router();
const Shirt_sizes = require("../controllers/shirt_sizes_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Shirt_sizes.get_shirt_sizes); // Obtener todos las tallas de camisa
router.post("/", Shirt_sizes.post__shirt_sizes); // Crear talla de camisa

module.exports = router;