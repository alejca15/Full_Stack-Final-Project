const { Parents } = require("../models");

//----------------------Get------------------------//
const get_parents = async (req, res) => {
  try {
    const all_parents = await Parents.findAll();
    res.status(200).json(all_parents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los Encargados." });
  }
};
//----------------------Post------------------------//
const post_parent = async (req, res) => {
  try {
    const {
      parent_name,
      parent_first_lastname,
      parent_second_lastname,
      parent_phone,
      role,
      athlete_id,
    } = req.body;
    const new_parent = await Parents.create({
      parent_name,
      parent_first_lastname,
      parent_second_lastname,
      parent_phone,
      role,
      athlete_id,
    });
    res.status(201).json(new_parent);
  } catch (error) {
    res.status(500).json({ error: "Error al añadir Encargado" });
  }
};

//----------------------delete------------------------//
const delete_parent = async (req, res) => {
  try {
    const { id } = req.params;
    const parents = await Parents.findByPk(id);
    if (!parents)
      return res.status(404).json({ error: "Encargado no encontrado" });
    await parents.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el Encargado." });
  }
};

//----------------------Put------------------------//
const update_parent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      parent_name,
      parent_first_lastname,
      parent_second_lastname,
      parent_phone,
      role,
      athlete_id,
    } = req.body;
    const parent = await Parents.findByPk(id);
    if (!parent) {
      return res.status(404).json({ error: "Encargado no encontrado" });
    }
    await parent.update({
      parent_name,
      parent_first_lastname,
      parent_second_lastname,
      parent_phone,
      role,
      athlete_id,
    });
    res.status(200).json(parent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Encargado" });
  }
};

module.exports = {
  get_parents,
  post_parent,
  delete_parent,
  update_parent
};
