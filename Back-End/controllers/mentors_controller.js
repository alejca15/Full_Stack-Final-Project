const { Mentors } = require("../models");


//----------------------Get------------------------//
const get_mentors = async (req, res) => {
  try {
    const all_mentors = await Mentors.findAll();
    res.status(200).json(all_mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los Mentores." });
  }
};
//----------------------Post------------------------//
const post_mentor = async (req, res) => {
  try {
    const {
      mentor_name,
      mentor_lastname,
      location_id,
      phone,
    } = req.body;


    const new_mentor = await Mentors.create({
      mentor_name,
      mentor_lastname,
      location_id,
      phone,
    });
    res.status(201).json(new_mentor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir Mentor" });
  }
};

//----------------------delete------------------------//
const delete_mentor = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await Mentors.findByPk(id);
    if (!mentor)
      return res.status(404).json({ error: "Mentor no encontrado" });
    await mentor.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el Mentor." });
  }
};

//----------------------Put------------------------//
const update_mentor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      mentor_name,
      mentor_lastname,
      location_id,
      phone,
    } = req.body;
    const mentor = await Mentors.findByPk(id);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor no encontrado" });
    }
    await mentor.update({
      mentor_name,
      mentor_lastname,
      location_id,
      phone,
    });
    res.status(200).json(mentor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Mentor" });
  }
};

module.exports = {
  get_mentors,
  post_mentor,
  delete_mentor,
  update_mentor
};
