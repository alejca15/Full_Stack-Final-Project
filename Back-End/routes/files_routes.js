const express = require("express");
const router = express.Router();
const Files = require("../controllers/files_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Files.get_files); // Obtener todos los archivos
router.post("/", Files.post_files); // Crear archivo
router.delete("/:id", Files.delete_file); // Eliminar archivo por ID
router.put("/:id", Files.update_file); // Actualizar archivo por ID

module.exports = router;