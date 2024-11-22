const { Athlete_sizes } = require("../models");

//----------------------Get------------------------//
const get_athlete_sizes = async (req, res) => {
  try {
    const all_athlete_sizes = await Athlete_sizes.findAll();
    res.status(200).json(all_athlete_sizes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tallas de los atletas." });
  }
};

//----------------------Post------------------------//
const post_athletes_sizes = async (req, res) => {
  try {
    const { shoe_sizes_id, shirt_sizes_id, athlete_id } = req.body;
    if (!shoe_sizes_id || !shirt_sizes_id || !athlete_id) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const athlete_sizes = await Athlete_sizes.create({
      shoe_sizes_id,
      shirt_sizes_id,
      athlete_id,
    });
    res.status(201).json(athlete_sizes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir las tallas de atleta" });
  }
};

//----------------------delete------------------------//
const delete_athlete_sizes = async (req, res) => {
  try {
    const { id } = req.params;
    const athletes_sizes = await Athlete_sizes.findByPk(id);
    if (!athletes_sizes)
      return res.status(404).json({ error: "Tallas de atleta no encontradas" });
    await athletes_sizes.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el Atleta." });
  }
};

//----------------------Put------------------------//
const update_athlete_sizes = async (req, res) => {
  try {
    const { id } = req.params;
    const { shoe_size_id, shirt_size_id, athlete_id } = req.body;
    const athlete_sizes = await Athlete_sizes.findByPk(id);
    if (!athlete_sizes) {
      return res.status(404).json({ error: "Atleta no encontrado" });
    }
    await athlete_sizes.update({
      shoe_size_id,
      shirt_size_id,
      athlete_id,
    });
    res.status(200).json(athlete_sizes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el atleta" });
  }
};

module.exports = {
  get_athlete_sizes,
  post_athletes_sizes,
  delete_athlete_sizes,
  update_athlete_sizes,
};
