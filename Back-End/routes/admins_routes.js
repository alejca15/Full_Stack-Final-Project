const express = require("express");
const router = express.Router();
const Admins = require("../controllers/admins_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Admins.get_admins); // Obtener todos los Administradores
router.post("/",Admins.post_admins ); // Crear Administrador
router.delete("/:id",Admins.delete_admins ); // Eliminar Administrador
router.put("/:id",Admins.update_admins ); // Actualizar Administrador


module.exports = router;