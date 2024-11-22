const express = require("express");
const router = express.Router();
const Shoe_sizes = require("../controllers/shoe_sizes_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Shoe_sizes.get_shoe_sizes); // Obtener todos las tallas de calzado
router.post("/", Shoe_sizes.post__shoe_sizes); // Crear talla de calzado

module.exports = router;