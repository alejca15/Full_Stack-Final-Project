const express = require("express");
const router = express.Router();
const Shirt_sizes = require("../controllers/shirt_sizes_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Shirt_sizes.get_shirt_sizes); // Obtener todas las tallas de camisa
router.post("/", Shirt_sizes.post_shirt_sizes); // Crear talla de camisa
router.delete("/:id", Shirt_sizes.delete_shirt_size); // Eliminar talla de camisa
router.put("/:id", Shirt_sizes.update_shirt_size); // Actualizar talla de camisa

module.exports = router;