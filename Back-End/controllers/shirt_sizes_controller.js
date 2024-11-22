const { Shirt_sizes } = require("../models");

//----------------------Get------------------------//
const get_shirt_sizes = async (req, res) => {
    try {
      const all_shirt_sizes = await Shirt_sizes.findAll();
      res.status(200).json(all_shirt_sizes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las tallas de camiseta." });
    }
  };
//----------------------Post------------------------//
const post__shirt_sizes = async (req, res) => {
    try {
      const { size} = req.body;
      const all_shirt_sizes = await Shirt_sizes.create({
        size,
      });
      res.status(201).json(all_shirt_sizes);
    } catch (error) {
      res.status(500).json({ error: "Error al añadir talla de camiseta" });
    }
  };
  module.exports = { 
    get_shirt_sizes,
    post__shirt_sizes
  };