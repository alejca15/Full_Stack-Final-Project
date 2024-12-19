const express = require("express");
const router = express.Router();
const Users = require("../controllers/users_controller"); // Importar el controlador

// Definir las rutas
router.get("/", Users.get_users); // Obtener todos los usuarios
router.post("/", Users.post_users); // Crear usuario
router.delete("/:id", Users.delete_user); // Eliminar usuario
router.put("/:id", Users.update_user); // Actualizar usuario

module.exports = router;
