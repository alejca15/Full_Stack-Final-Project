import axios from "axios";

// Obtener el token de sessionStorage
const token = sessionStorage.getItem("Token");

// Headers
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
};

//----------------------------------Post-------------------------------//
const post_Admins = async (Admin_Data) => {
  try {
    const response = await axios.post("http://localhost:3000/Admins", Admin_Data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error posting Admin", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_Admins = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Admins", axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching Admins:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_Admin = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Admins/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error deleting Admin", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_Admin = async (id, Admin_Data) => {
  try {
    const response = await axios.put(`http://localhost:3000/Admins/${id}`, Admin_Data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating Admin", error);
    throw error;
  }
};

export default { post_Admins, get_Admins, delete_Admin, update_Admin };