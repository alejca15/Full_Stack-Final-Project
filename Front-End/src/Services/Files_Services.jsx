import axios from "axios";

// Obtener el token de sessionStorage
const token = sessionStorage.getItem("Token");

// Configurar los encabezados de autorización
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
};

//----------------------------------Post-------------------------------//
const post_file = async (file_data) => {
  try {
    const response = await axios.post("http://localhost:3000/files", file_data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error posting file:", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_files = async () => {
  try {
    const response = await axios.get("http://localhost:3000/files", axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_file = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/files/${id}`, axiosConfig);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_file = async (id, file_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/files/${id}`, file_data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
};

export default { post_file, get_files, delete_file, update_file };