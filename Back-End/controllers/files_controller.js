const { Files } = require('../models');

//----------------------Get------------------------//
const get_files = async (req, res) => {
  try {
    const all_files = await Files.findAll();
    res.status(200).json(all_files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los archivos." });
  }
};

//----------------------Post------------------------//
const post_files = async (req, res) => {
  try {
    const { file_name, file_path } = req.body;
    if (!file_name || !file_path) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const file = await Files.create({ file_name, file_path });
    res.status(201).json({ id: file.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir el archivo" });
  }
};

//----------------------Delete------------------------//
const delete_file = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await Files.findByPk(id);
    if (!file) return res.status(404).json({ error: "Archivo no encontrado" });
    await file.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el archivo." });
  }
};

//----------------------Put------------------------//
const update_file = async (req, res) => {
  try {
    const { id } = req.params;
    const { file_name, file_path } = req.body;

    const file = await Files.findByPk(id);

    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }
    await file.update({ file_name, file_path });

    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el archivo" });
  }
};

module.exports = {
  get_files,
  post_files,
  delete_file,
  update_file,
};