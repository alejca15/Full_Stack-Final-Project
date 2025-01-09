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

//-----------------------Post----------------------------//
let post_Direction = async (Direction_data) => {
  try {
    const response = await axios.post("http://localhost:3000/Directions", Direction_data, axiosConfig);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

//-----------------------Get----------------------------//
let get_Directions = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Directions", axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//-----------------------Delete----------------------------//
let delete_Direction = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Directions/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//-----------------------Put----------------------------//
let update_Direction = async (id, Direction_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/Directions/${id}`, Direction_data, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { post_Direction, get_Directions, delete_Direction, update_Direction };