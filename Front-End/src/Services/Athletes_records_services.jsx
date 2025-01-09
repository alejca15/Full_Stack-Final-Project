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

//------------------POST-----------------------//
let post_AthleteRecord = async (record_data) => {
  try {
    const response = await axios.post("http://localhost:3000/AthletesRecords", record_data, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//------------------GET-----------------------//
let get_AthleteRecords = async () => {
  try {
    const response = await axios.get("http://localhost:3000/AthletesRecords", axiosConfig);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//------------------DELETE-----------------------//
let delete_AthleteRecord = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/AthletesRecords/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//------------------PUT-----------------------//
let update_AthleteRecord = async (id, record_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/AthletesRecords/${id}`, record_data, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { post_AthleteRecord, get_AthleteRecords, delete_AthleteRecord, update_AthleteRecord };