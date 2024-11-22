const { Athlete_records } = require("../models");

//----------------------Get------------------------//
const get_athletes_records = async (req, res) => {
  try {
    const all_athletes_records = await Athlete_records.findAll();
    res.status(200).json(all_athletes_records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los Expedientes del Atleta." });
  }
};
//----------------------Post------------------------//
const post_athlete_records = async (req, res) => {
  try {
    const { folder_id, file_name, file_url, athlete_id } = req.body;
    const Address = await Athlete_records.create({
      folder_id,
      file_name,
      file_url, 
      athlete_id,
    });
    res.status(201).json(Address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir el expediente del atleta" });
  }
};
module.exports = {
  get_athletes_records,
  post_athlete_records,
};
