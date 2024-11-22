const express = require("express");
const router = express.Router();
const Mentors_by_athletes = require("../controllers/mentors_by_athletes_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Mentors_by_athletes.get_mentors_by_athletes); // Obtener todos las provincias
router.post("/", Mentors_by_athletes.post_mentors_by_athletes); // Crear Provincia

module.exports = router;