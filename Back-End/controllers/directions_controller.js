const { Directions } = require("../models");

//----------------------Get------------------------//
const get_directions = async (req, res) => {
    try {
      const all_directions = await Directions.findAll();
      res.status(200).json(all_directions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las direcciones." });
    }
  };
//----------------------Post------------------------//
const post_direction = async (req, res) => {
    try {
      const { direction_name} = req.body;
      const Direction = await Directions.create({
        direction_name,
      });
      res.status(201).json({ id: Direction.id });
    } catch (error) {
      res.status(500).json({ error: "Error al añadir la direccion" });
    }
  };
  module.exports = { 
    get_directions,
    post_direction
  };