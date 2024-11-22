const express = require("express");
const router = express.Router();
const Counselors = require("../controllers/counselors_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Counselors.get_counselor); // Obtener todos los Orientadores
router.post("/",Counselors.post_counselor ); // Crear Orientador
router.delete("/:id",Counselors.delete_counselor ); // Eliminar Orientador
router.put("/:id",Counselors.update_counselor ); // Actualizar Orientador


module.exports = router;