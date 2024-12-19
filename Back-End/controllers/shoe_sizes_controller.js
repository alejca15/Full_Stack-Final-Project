const { Shoe_sizes } = require("../models");

//----------------------Get------------------------//
const get_shoe_sizes = async (req, res) => {
  try {
    const all_shoe_sizes = await Shoe_sizes.findAll();
    res.status(200).json(all_shoe_sizes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tallas de calzado." });
  }
};

//----------------------Post------------------------//
const post_shoe_sizes = async (req, res) => {
  try {
    const { size } = req.body;
    const new_shoe_size = await Shoe_sizes.create({
      size,
    });
    res.status(201).json(new_shoe_size);
  } catch (error) {
    res.status(500).json({ error: "Error al añadir talla de calzado" });
  }
};

//----------------------Delete------------------------//
const delete_shoe_size = async (req, res) => {
  try {
    const { id } = req.params;
    await Shoe_sizes.destroy({ where: { id } });
    res.status(200).json({ message: "Talla de calzado eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la talla de calzado" });
  }
};

//----------------------Put------------------------//
const update_shoe_size = async (req, res) => {
  try {
    const { id } = req.params;
    const { size } = req.body;
    await Shoe_sizes.update(
      { size },
      { where: { id } }
    );
    res.status(200).json({ message: "Talla de calzado actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la talla de calzado" });
  }
};

module.exports = {
  get_shoe_sizes,
  post_shoe_sizes,
  delete_shoe_size,
  update_shoe_size,
};