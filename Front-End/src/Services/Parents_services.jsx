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
const post_parents = async (Parent_data) => {
  try {
    const response = await axios.post("http://localhost:3000/Parents", Parent_data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error posting Parent:", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_parents = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Parents", axiosConfig);
    return response.data; 
  } catch (error) {
    console.error("Error fetching Parents:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_parent = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Parents/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error deleting Parent:", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_parent = async (id, Parent_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/Parents/${id}`, Parent_data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating Parent:", error);
    throw error;
  }
};

export default { post_parents, get_parents, delete_parent, update_parent };