const { Comments_by_incidents } = require("../models");

//----------------------Get------------------------//
const get_comments_in_incidents = async (req, res) => {
  try {
    const all_comments = await Comments_by_incidents.findAll();
    res.status(200).json(all_comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los Comentarios en Comentarios." });
  }
};
//----------------------Post------------------------//
const post_comment_in_incident = async (req, res) => {
  try {
    const {
      comment,
      incident_id,
      counselor_id,
      mentor_id,
      admin_id,
      athlete_id,
    } = req.body;
    const new_comment = await Comments_by_incidents.create({
      comment,
      incident_id,
      counselor_id,
      mentor_id,
      admin_id,
      athlete_id,
    });
    res.status(201).json(new_comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir Comentario" });
  }
};

//----------------------delete------------------------//
const delete_comment_in_incident = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comments_by_incidents.findByPk(id);
    if (!comment)
      return res.status(404).json({ error: "comment no encontrado" });
    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el Comentario." });
  }
};

//----------------------Put------------------------//
const update_comment_in_incident = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      comment,
      incident_id,
      counselor_id,
      mentor_id,
      admin_id,
      athlete_id,
    } = req.body;
    const comment_in_incident = await Comments_by_incidents.findByPk(id);
    if (!comment_in_incident) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    await comment_in_incident.update({
      comment,
      incident_id,
      counselor_id,
      mentor_id,
      admin_id,
      athlete_id,
    });
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Comentario" });
  }
};

module.exports = {
  get_comments_in_incidents,
  post_comment_in_incident,
  delete_comment_in_incident,
  update_comment_in_incident,
};
