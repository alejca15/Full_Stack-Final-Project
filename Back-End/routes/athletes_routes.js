const express = require("express");
const router = express.Router();
const Athletes = require("../controllers/athletes_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Athletes.get_athletes); // Obtener todos los atletas
router.post("/",Athletes.post_athletes ); // Crear Atleta
router.delete("/:id",Athletes.delete_athlete ); // Eliminar Atleta
router.put("/:id",Athletes.update_athlete ); // Actualizar Atleta


module.exports = router;