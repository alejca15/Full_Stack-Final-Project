const express = require("express");
const router = express.Router();
const Athletes_records = require("../controllers/athlete_records_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Athletes_records.get_athletes_records); // Obtener todos los cantones
router.post("/", Athletes_records.post_athlete_records ); // Crear canton

module.exports = router;