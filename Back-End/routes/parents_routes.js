const express = require("express");
const router = express.Router();
const Parents = require("../controllers/parents_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Parents.get_parents); // Obtener todos los atletas
router.post("/",Parents.post_parent ); // Crear Atleta
router.delete("/:id",Parents.delete_parent ); // Eliminar Atleta
router.put("/:id",Parents.update_parent ); // Actualizar Atleta


module.exports = router;