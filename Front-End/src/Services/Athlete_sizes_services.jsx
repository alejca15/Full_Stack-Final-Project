import axios from "axios";

//------------------POST-----------------------//
let post_AthleteSizes = async (sizes_data) => {
  try {
    const response = await axios.post("http://localhost:3000/Athletessizes", sizes_data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//------------------GET-----------------------//
let get_AthleteSizes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Athletessizes");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//------------------DELETE-----------------------//
let delete_AthleteSize = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Athletessizes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//------------------PUT-----------------------//
let update_AthleteSize = async (id, sizes_data) => {
  try {
    console.log("Data", sizes_data);
    
    const response = await axios.put(`http://localhost:3000/Athletessizes/${id}`, sizes_data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response del servicio",response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { post_AthleteSizes, get_AthleteSizes, delete_AthleteSize, update_AthleteSize };