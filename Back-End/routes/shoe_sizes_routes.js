const express = require("express");
const router = express.Router();
const Shoe_sizes = require("../controllers/shoe_sizes_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Shoe_sizes.get_shoe_sizes); // Obtener todas las tallas de calzado
router.post("/", Shoe_sizes.post_shoe_sizes); // Crear talla de calzado
router.delete("/:id", Shoe_sizes.delete_shoe_size); // Eliminar talla de calzado
router.put("/:id", Shoe_sizes.update_shoe_size); // Actualizar talla de calzado

module.exports = router;