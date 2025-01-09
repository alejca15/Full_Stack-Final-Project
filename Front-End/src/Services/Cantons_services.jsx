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

//----------------------Get-------------------//
let getCantons = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Cantons", axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error("No fue posible obtener los cantones: " + error.message);
  }
};

//----------------------Post-------------------//
let postCanton = async (cantonData) => {
  try {
    const response = await axios.post("http://localhost:3000/Cantons", cantonData, axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error("No fue posible crear el cantón: " + error.message);
  }
};

//----------------------Delete-------------------//
let deleteCanton = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Cantons/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error("No fue posible eliminar el cantón: " + error.message);
  }
};

//----------------------Put-------------------//
let updateCanton = async (id, cantonData) => {
  try {
    const response = await axios.put(`http://localhost:3000/Cantons/${id}`, cantonData, axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error("No fue posible actualizar el cantón: " + error.message);
  }
};

export default { getCantons, postCanton, deleteCanton, updateCanton };