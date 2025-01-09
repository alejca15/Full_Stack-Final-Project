const express = require("express");
const router = express.Router();
const Athletes_records = require("../controllers/athlete_records_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Athletes_records.get_athletes_records); // Obtener todos los registros de atletas
router.post("/", Athletes_records.post_athlete_records); // Crear un registro de atleta
router.put("/:id", Athletes_records.update_athlete_record); // Actualizar un registro de atleta
router.delete("/:id", Athletes_records.delete_athlete_record); // Eliminar un registro de atleta

module.exports = router;