import axios from "axios";

//----------------------Post------------------------//
let post_Address = async (Address_data) => {
  try {
    let response = await axios.post("http://localhost:3000/Addresses", Address_data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//----------------------Get------------------------//
const get_Addresses = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Addresses");
    return response.data;
  } catch (error) {
    console.error("Error fetching Addresses:", error);
    throw error;
  }
};

//----------------------Delete------------------------//
const delete_Address = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Addresses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Address:", error);
    throw error;
  }
};

//----------------------Put------------------------//
const update_Address = async (id, Address_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/Addresses/${id}`, Address_data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating Address:", error);
    throw error;
  }
};

export default { post_Address, get_Addresses, delete_Address, update_Address };