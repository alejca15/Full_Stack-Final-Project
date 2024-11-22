const express = require("express");
const router = express.Router();
const Comments = require("../controllers/comments_by_incidents"); // Importar el controlador

// Definir las rutas
router.get("/", Comments.get_comments_in_incidents); // Obtener todos los Comentarios
router.post("/",Comments.post_comment_in_incident ); // Crear Comentario
router.delete("/:id",Comments.delete_comment_in_incident ); // Eliminar Comentario
router.put("/:id",Comments.update_comment_in_incident ); // Actualizar Comentario


module.exports = router;