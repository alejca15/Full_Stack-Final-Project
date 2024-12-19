const { Addresses } = require("../models");

//----------------------Get------------------------//
const get_addresses = async (req, res) => {
  try {
    const all_addresses = await Addresses.findAll();
    res.status(200).json(all_addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las direcciones." });
  }
};

//----------------------Post------------------------//
const post_addresses = async (req, res) => {
  try {
    const { province_id, canton_id, direction_id } = req.body;
    const Address = await Addresses.create({
      province_id,
      canton_id,
      direction_id,
    });
    res.status(201).json({ id: Address.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir la Address" });
  }
};

//----------------------Delete------------------------//
const delete_address = async (req, res) => {
  try {
    const { id } = req.params;
    await Addresses.destroy({ where: { id } });
    res.status(200).json({ message: "Address eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la Address" });
  }
};

//----------------------Put------------------------//
const update_address = async (req, res) => {
  try {
    const { id } = req.params;
    const { province_id, canton_id, direction_id } = req.body;
    await Addresses.update(
      { province_id, canton_id, direction_id },
      { where: { id } }
    );
    res.status(200).json({ message: "Address actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la Address" });
  }
};

module.exports = {
  get_addresses,
  post_addresses,
  delete_address,
  update_address,
};
