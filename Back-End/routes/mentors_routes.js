const express = require("express");
const router = express.Router();
const Mentors = require("../controllers/mentors_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Mentors.get_mentors); // Obtener todos los Mentores
router.post("/",Mentors.post_mentor); // Crear Mentor
router.delete("/:id",Mentors.delete_mentor); // Eliminar Mentor
router.put("/:id",Mentors.update_mentor); // Actualizar Mentor


module.exports = router;