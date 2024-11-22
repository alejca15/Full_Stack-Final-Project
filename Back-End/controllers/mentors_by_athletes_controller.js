const { Mentors_by_athletes } = require("../models");

//----------------------Get------------------------//
const get_mentors_by_athletes = async (req, res) => {
  try {
    const all_mentors_by_athletes = await Mentors_by_athletes.findAll();
    res.status(200).json(all_mentors_by_athletes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los mentores y sus atletas." });
  }
};

//----------------------Post------------------------//
const post_mentors_by_athletes = async (req, res) => {
  try {
    const { mentor_id, athlete_id,} = req.body;
    const mentors_by_athletes = await Mentors_by_athletes.create({
      mentor_id,
      athlete_id,
    });
    res.status(201).json(mentors_by_athletes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir el mentor y su atleta" });
  }
};
module.exports = {
  get_mentors_by_athletes,
  post_mentors_by_athletes,
};