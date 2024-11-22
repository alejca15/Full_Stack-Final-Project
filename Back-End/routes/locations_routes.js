const express = require("express");
const router = express.Router();
const Locations = require("../controllers/locations_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Locations.get_locations); // Obtener todos los Sede
router.post("/",Locations.post_location ); // Crear Sede
router.delete("/:id",Locations.delete_location ); // Eliminar Sede
router.put("/:id",Locations.update_location ); // Actualizar Sede


module.exports = router;