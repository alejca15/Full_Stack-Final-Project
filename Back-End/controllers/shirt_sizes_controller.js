const { Shirt_sizes } = require("../models");

//----------------------Get------------------------//
const get_shirt_sizes = async (req, res) => {
  try {
    const all_shirt_sizes = await Shirt_sizes.findAll();
    res.status(200).json(all_shirt_sizes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tallas de camiseta." });
  }
};

//----------------------Post------------------------//
const post_shirt_sizes = async (req, res) => {
  try {
    const { size } = req.body;
    const new_shirt_size = await Shirt_sizes.create({
      size,
    });
    res.status(201).json(new_shirt_size);
  } catch (error) {
    res.status(500).json({ error: "Error al añadir talla de camiseta" });
  }
};

//----------------------Delete------------------------//
const delete_shirt_size = async (req, res) => {
  try {
    const { id } = req.params;
    await Shirt_sizes.destroy({ where: { id } });
    res.status(200).json({ message: "Talla de camiseta eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la talla de camiseta" });
  }
};

//----------------------Put------------------------//
const update_shirt_size = async (req, res) => {
  try {
    const { id } = req.params;
    const { size } = req.body;
    await Shirt_sizes.update(
      { size },
      { where: { id } }
    );
    res.status(200).json({ message: "Talla de camiseta actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la talla de camiseta" });
  }
};

module.exports = {
  get_shirt_sizes,
  post_shirt_sizes,
  delete_shirt_size,
  update_shirt_size,
};