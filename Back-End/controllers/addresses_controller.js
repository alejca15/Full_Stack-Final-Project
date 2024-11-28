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

module.exports = {
  get_addresses,
  post_addresses,
};
