const { Counselors } = require("../models");


//----------------------Get------------------------//
const get_counselor = async (req, res) => {
  try {
    const all_counselors = await Counselors.findAll();
    res.status(200).json(all_counselors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los Orientadores." });
  }
};
//----------------------Post------------------------//
const post_counselor = async (req, res) => {
  try {
    const {
      counselor_name,
      counselor_first_lastname,
      counselor_second_lastname,
      location_id,
      phone,
    } = req.body;

    const new_counselor = await Counselors.create({
      counselor_name,
      counselor_first_lastname,
      counselor_second_lastname,
      location_id,
      phone,
    });
    res.status(201).json(new_counselor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir orientador" });
  }
};

//----------------------delete------------------------//
const delete_counselor = async (req, res) => {
  try {
    const { id } = req.params;
    const counselor = await Counselors.findByPk(id);
    if (!counselor)
      return res.status(404).json({ error: "counselor no encontrado" });
    await counselor.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el counselor." });
  }
};

//----------------------Put------------------------//
const update_counselor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      counselor_name,
      counselor_first_lastname,
      counselor_second_lastname,
      location_id,
      phone,
    } = req.body;
    const counselor = await Counselors.findByPk(id);
    if (!counselor) {
      return res.status(404).json({ error: "Orientador no encontrado" });
    }
    await counselor.update({
      counselor_name,
      counselor_first_lastname,
      counselor_second_lastname,
      location_id,
      phone,
    });
    res.status(200).json(counselor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Orientador" });
  }
};

module.exports = {
  get_counselor,
  post_counselor,
  delete_counselor,
  update_counselor
};
