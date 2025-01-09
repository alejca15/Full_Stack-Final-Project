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

//----------------------Post------------------------//
let post_Address = async (Address_data) => {
  try {
    let response = await axios.post("http://localhost:3000/Addresses", Address_data, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//----------------------Get------------------------//
const get_Addresses = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Addresses", axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching Addresses:", error);
    throw error;
  }
};

//----------------------Delete------------------------//
const delete_Address = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Addresses/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error deleting Address:", error);
    throw error;
  }
};

//----------------------Put------------------------//
const update_Address = async (id, Address_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/Addresses/${id}`, Address_data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error updating Address:", error);
    throw error;
  }
};

export default { post_Address, get_Addresses, delete_Address, update_Address };