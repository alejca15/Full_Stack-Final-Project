const { Cantons } = require("../models");

//----------------------Get------------------------//
const get_cantons = async (req, res) => {
    try {
      const all_cantons = await Cantons.findAll();
      res.status(200).json(all_cantons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los cantones." });
    }
  };
//----------------------Post------------------------//
const post_cantons = async (req, res) => {
    try {
      const { canton_name,province_id} = req.body;
      const Canton = await Cantons.create({
        canton_name,
        province_id
      });
      res.status(201).json(Canton);
    } catch (error) {
      res.status(500).json({ error: "Error al añadir la Canton" });
    }
  };
  module.exports = { 
    get_cantons,
    post_cantons
  };