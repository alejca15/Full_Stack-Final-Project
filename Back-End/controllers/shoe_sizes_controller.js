const { Shoe_sizes } = require("../models");

//----------------------Get------------------------//
const get_shoe_sizes = async (req, res) => {
    try {
      const all_shoe_sizes = await Shoe_sizes.findAll();
      res.status(200).json(all_shoe_sizes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las tallas de calzado." });
    }
  };
//----------------------Post------------------------//
const post__shoe_sizes = async (req, res) => {
    try {
      const { size} = req.body;
      const all_shoe_sizes = await Shoe_sizes.create({
        size,
      });
      res.status(201).json(all_shoe_sizes);
    } catch (error) {
      res.status(500).json({ error: "Error al añadir talla de calzado" });
    }
  };
  module.exports = { 
    get_shoe_sizes,
    post__shoe_sizes
  };