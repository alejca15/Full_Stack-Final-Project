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
const post_mentors = async (Mentor_data) => {
  try {
    const response = await axios.post("http://localhost:3000/Mentors", Mentor_data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error posting mentor:", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_mentors = async () => {
  try {   
    const response = await axios.get("http://localhost:3000/Mentors", axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_mentor = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Mentors/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error deleting mentor:", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_mentor = async (id, Mentor_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/Mentors/${id}`, Mentor_data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating mentor:", error);
    throw error;
  }
};

export default { post_mentors, get_mentors, delete_mentor, update_mentor };