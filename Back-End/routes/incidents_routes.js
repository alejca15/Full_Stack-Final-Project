const express = require("express");
const router = express.Router();
const Incidents = require("../controllers/incidents_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Incidents.get_incident); // Obtener todos los Incidentes
router.post("/",Incidents.post_incident ); // Crear Incidente
router.delete("/:id",Incidents.delete_incident ); // Eliminar Incidente
router.put("/:id",Incidents.update_incident ); // Actualizar Incidente


module.exports = router;