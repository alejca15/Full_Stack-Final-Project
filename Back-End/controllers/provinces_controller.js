const { Provinces } = require("../models");

//----------------------Get------------------------//
const get_provinces = async (req, res) => {
    try {
      const all_provinces = await Provinces.findAll();
      res.status(200).json(all_provinces);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las provincias." });
    }
  };
//----------------------Post------------------------//
const post_province = async (req, res) => {
    try {
      const { province_name} = req.body;
      const province = await Provinces.create({
        province_name,
      });
      res.status(201).json(province);
    } catch (error) {
      res.status(500).json({ error: "Error al añadir Provincia" });
    }
  };
  module.exports = { 
    get_provinces,
    post_province
  };