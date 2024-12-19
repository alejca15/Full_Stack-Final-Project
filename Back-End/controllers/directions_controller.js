const { Directions } = require("../models");

//----------------------Get------------------------//
const get_directions = async (req, res) => {
  try {
    const all_directions = await Directions.findAll();
    res.status(200).json(all_directions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las direcciones." });
  }
};

//----------------------Post------------------------//
const post_direction = async (req, res) => {
  try {
    const { direction_name } = req.body;
    const Direction = await Directions.create({
      direction_name,
    });
    res.status(201).json({ id: Direction.id });
  } catch (error) {
    res.status(500).json({ error: "Error al añadir la direccion" });
  }
};

//----------------------Delete------------------------//
const delete_direction = async (req, res) => {
  try {
    const { id } = req.params;
    await Directions.destroy({ where: { id } });
    res.status(200).json({ message: "Dirección eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la dirección" });
  }
};

//----------------------Put------------------------//
const update_direction = async (req, res) => {
  try {
    const { id } = req.params;
    const { direction_name } = req.body;
    await Directions.update(
      { direction_name },
      { where: { id } }
    );
    res.status(200).json({ message: "Dirección actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la dirección" });
  }
};

module.exports = { 
  get_directions,
  post_direction,
  delete_direction,
  update_direction
};