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
const post_Location = async (Location_Data) => {
  try {
    const response = await axios.post("http://localhost:3000/Locations", Location_Data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error posting Location", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_Locations = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Locations", axiosConfig);
    return response.data; 
  } catch (error) {
    console.error("Error fetching Locations:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_Location = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Locations/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error deleting Location", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_Location = async (id, Location_Data) => {
  try {
    const response = await axios.put(`http://localhost:3000/Locations/${id}`, Location_Data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating Location", error);
    throw error;
  }
};

export default { post_Location, get_Locations, delete_Location, update_Location };