const express = require("express");
const router = express.Router();
const Athletes_sizes = require("../controllers/Athlete_sizes_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Athletes_sizes.get_athlete_sizes); // Obtener todos los atletas
router.post("/",Athletes_sizes.post_athletes_sizes ); // Crear Atleta
router.delete("/:id",Athletes_sizes.delete_athlete_sizes ); // Eliminar Atleta
router.put("/:id",Athletes_sizes.update_athlete_sizes ); // Actualizar Atleta


module.exports = router;