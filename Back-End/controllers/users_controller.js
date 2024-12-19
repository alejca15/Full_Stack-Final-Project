const { Users } = require("../models");
const bcrypt = require("bcrypt");

//----------------------Get------------------------//
const get_users = async (req, res) => {
  try {
    const all_users = await Users.findAll();
    res.status(200).json(all_users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios." });
  }
};

//----------------------Post------------------------//
const post_users = async (req, res) => {
  try {
    const { mail, password, counselor_id, admin_id, athlete_id, mentor_id } =
      req.body;

    if (!mail || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
     const hashed_password= await bcrypt.hash(password,10);

    const user = await Users.create({
      mail,
      password:hashed_password,
      counselor_id,
      admin_id,
      athlete_id,
      mentor_id,
    });
    res.status(201).json({ id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir el usuario" });
  }
};

//----------------------Delete------------------------//
const delete_user = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario." });
  }
};

//----------------------Put------------------------//
const update_user = async (req, res) => {
  try {
    const { id } = req.params;

    let { mail, password, counselor_id, admin_id, athlete_id, mentor_id } =
      req.body;

    const user = await Users.findByPk(id);
    if (user.password !== password) {
      const hashed_password = await bcrypt.hash(password, 10);
      password = hashed_password;
      
    }

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await user.update({
      mail,
      password,
      counselor_id,
      admin_id,
      athlete_id,
      mentor_id,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

module.exports = {
  get_users,
  post_users,
  delete_user,
  update_user,
};
