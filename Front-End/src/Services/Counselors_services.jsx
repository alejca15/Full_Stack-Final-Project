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
const post_counselor = async (Counselor_Data) => {
  try {
    const response = await axios.post("http://localhost:3000/Counselors", Counselor_Data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error posting counselor:", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_counselors = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Counselors", axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching Counselors:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_counselor = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Counselors/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error deleting counselor:", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_counselor = async (id, Counselor_Data) => {
  try {
    const response = await axios.put(`http://localhost:3000/Counselors/${id}`, Counselor_Data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating counselor:", error);
    throw error;
  }
};

export default { post_counselor, get_counselors, delete_counselor, update_counselor };