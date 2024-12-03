const { Athletes } = require("../models");
const bcrypt=require('bcrypt')

//----------------------Get------------------------//
const get_athletes = async (req, res) => {
  try {
    const all_athletes = await Athletes.findAll();
    res.status(200).json(all_athletes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los atletas." });
  }
};

//----------------------Post------------------------//
const post_athletes = async (req, res) => {
  try {
    const {
      athlete_name,
      athlete_first_lastname,
      athlete_second_lastname,
      birthday,
      nationality,
      gender,
      mail,
      password,
      phone,
      blood_type,
      address_id,
      dominant_side,
      education_entity,
      actual_grade,
      addition_date,
      athlete_status,
    } = req.body;
    if (
      !athlete_name ||
      !athlete_first_lastname ||
      !athlete_second_lastname ||
      !birthday ||
      !nationality ||
      !gender ||
      !mail ||
      !password||
      !phone ||
      !blood_type ||
      !address_id ||
      !dominant_side ||
      !education_entity ||
      !actual_grade ||
      !addition_date ||
      !athlete_status
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const hashed_password= await bcrypt.hash(password,10);

    const athlete = await Athletes.create({
      athlete_name,
      athlete_first_lastname,
      athlete_second_lastname,
      birthday,
      nationality,
      gender,
      mail,
      password:hashed_password,
      phone,
      blood_type,
      address_id,
      dominant_side,
      education_entity,
      actual_grade,
      addition_date,
      athlete_status,
    });
    res.status(201).json({ id: athlete.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir el atleta" });
  }
};

//----------------------delete------------------------//
const delete_athlete = async (req, res) => {
  try {
    const { id } = req.params;

    const athletes = await Athletes.findByPk(id);
    if (!athletes)
      return res.status(404).json({ error: "Atleta no encontrado" });
    await athletes.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el Atleta." });
  }
};

//----------------------Put------------------------//
const update_athlete = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      athlete_name,
      athlete_first_lastname,
      athlete_second_lastname,
      birthday,
      nationality,
      gender,
      mail,
      password,
      phone,
      blood_type,
      address_id,
      dominant_side,
      education_entity,
      actual_grade,
      addition_date,
      athlete_status,
    } = req.body;

    const athlete = await Athletes.findByPk(id);

    if (!athlete) {
      return res.status(404).json({ error: "Atleta no encontrado" });
    }
    await athlete.update({
      athlete_name,
      athlete_first_lastname,
      athlete_second_lastname,
      birthday,
      nationality,
      gender,
      mail,
      password,
      phone,
      blood_type,
      address_id,
      dominant_side,
      education_entity,
      actual_grade,
      addition_date,
      athlete_status,
    });

    res.status(200).json(athlete);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el atleta" });
  }
};

module.exports = {
  get_athletes,
  post_athletes,
  delete_athlete,
  update_athlete,
};
