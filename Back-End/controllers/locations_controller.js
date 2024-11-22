const { Locations } = require("../models");

//----------------------Get------------------------//
const get_locations = async (req, res) => {
  try {
    const all_locations = await Locations.findAll();
    res.status(200).json(all_locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las Sedes." });
  }
};
//----------------------Post------------------------//
const post_location = async (req, res) => {
  try {
    const {
      location_name,
      location_contact,
      address_id,
      parent_phone,
    } = req.body;
    const new_location = await Locations.create({
      location_name,
      location_contact,
      address_id,
      parent_phone,
    });
    res.status(201).json(new_location);
  } catch (error) {
    res.status(500).json({ error: "Error al añadir Sede" });
  }
};

//----------------------delete------------------------//
const delete_location = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Locations.findByPk(id);
    if (!location)
      return res.status(404).json({ error: "Sede no encontrada" });
    await location.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el Sede." });
  }
};

//----------------------Put------------------------//
const update_location = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      location_name,
      location_contact,
      address_id,
      parent_phone,
    } = req.body;
    const location = await Locations.findByPk(id);
    if (!location) {
      return res.status(404).json({ error: "Sede no encontrada" });
    }
    await location.update({
      location_name,
      location_contact,
      address_id,
      parent_phone,
    });
    res.status(200).json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Sede" });
  }
};

module.exports = {
  get_locations,
  post_location,
  delete_location,
  update_location
};
