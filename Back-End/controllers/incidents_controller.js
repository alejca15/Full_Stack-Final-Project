const { Incidents } = require("../models");

//----------------------Get------------------------//
const get_incident = async (req, res) => {
  try {
    const all_incidents = await Incidents.findAll();
    res.status(200).json(all_incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los Incidentes." });
  }
};
//----------------------Post------------------------//
const post_incident = async (req, res) => {
  try {
    const { incident_name, incident_date, incident_state, athlete_id } =
      req.body;
    const new_incident = await Incidents.create({
      incident_name,
      incident_date,
      incident_state,
      athlete_id,
    });
    res.status(201).json(new_incident);
  } catch (error) {
    res.status(500).json({ error: "Error al añadir Incidente" });
  }
};

//----------------------delete------------------------//
const delete_incident = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await Incidents.findByPk(id);
    if (!incident)
      return res.status(404).json({ error: "incident no encontrado" });
    await incident.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "error al eliminar el incidente." });
  }
};

//----------------------Put------------------------//
const update_incident = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      incident_name,
      incident_date,
      incident_state,
      athlete_id,
    } = req.body;
    const incident = await Incidents.findByPk(id);
    if (!incident) {
      return res.status(404).json({ error: "Incidente no encontrado" });
    }
    await incident.update({
      incident_name,
      incident_date,
      incident_state,
      athlete_id,
    });
    res.status(200).json(incident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Incidente" });
  }
};

module.exports = {
  get_incident,
  post_incident,
  delete_incident,
  update_incident,
};
