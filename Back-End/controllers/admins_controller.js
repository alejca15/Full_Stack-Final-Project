const { Admins } = require("../models");

//----------------------Get------------------------//
const get_admins = async (req, res) => {
  try {
    const all_admins = await Admins.findAll();
    res.status(200).json(all_admins);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los admins." });
  }
};
//----------------------Post------------------------//
const post_admins = async (req, res) => {
  try {
    const {
      admin_name,
      admin_lastname,
      admin_mail,
      admin_phone,
    } = req.body;
    const new_admin = await Admins.create({
      admin_name,
      admin_lastname,
      admin_mail,
      admin_phone,
    });
    res.status(201).json(new_admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir Administrador" });
  }
};

//----------------------delete------------------------//
const delete_admins = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findByPk(id);
    if (!admin)
      return res.status(404).json({ error: "Administrador no encontrado" });
    await admin.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error al eliminar el Administrador." });
  }
};

//----------------------Put------------------------//
const update_admins = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      admin_name,
      admin_lastname,
      admin_mail,
      admin_phone,
    } = req.body;
    const admins = await Admins.findByPk(id);
    if (!admins) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }
    await admins.update({
      admin_name,
      admin_lastname,
      admin_mail,
      admin_phone,
    });
    res.status(200).json(admin_name);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Administrador" });
  }
};

module.exports = {
  get_admins,
  post_admins,
  delete_admins,
  update_admins,
};
