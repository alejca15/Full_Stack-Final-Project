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
    const athleteRecord = await Athlete_records.create({
      folder_id,
      file_name,
      file_url, 
      athlete_id,
    });
    res.status(201).json(athleteRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir el expediente del atleta" });
  }
};

//----------------------Put------------------------//
const update_athlete_record = async (req, res) => {
  try {
    const { id } = req.params;
    const { folder_id, file_name, file_url, athlete_id } = req.body;

    const athleteRecord = await Athlete_records.findByPk(id);
    if (!athleteRecord) {
      return res.status(404).json({ error: "Expediente del atleta no encontrado" });
    }

    await athleteRecord.update({
      folder_id,
      file_name,
      file_url, 
      athlete_id,
    });

    res.status(200).json(athleteRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el expediente del atleta" });
  }
};

//----------------------Delete------------------------//
const delete_athlete_record = async (req, res) => {
  try {
    const { id } = req.params;

    const athleteRecord = await Athlete_records.findByPk(id);
    if (!athleteRecord) {
      return res.status(404).json({ error: "Expediente del atleta no encontrado" });
    }

    await athleteRecord.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el expediente del atleta" });
  }
};

module.exports = {
  get_athletes_records,
  post_athlete_records,
  update_athlete_record,
  delete_athlete_record,
};