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
const post_Athlete = async (athleteData) => {
  try {
    const response = await axios.post("http://localhost:3000/Athletes", athleteData, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error posting athlete:", error);
    
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_Athletes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Athletes", axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching athletes:", error);
    throw error;
  }
};

const get_accepted_athletes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Athletes", axiosConfig);
    const accepted_athletes = response.data.filter(
      (user) => user.athlete_status === "Activo"
    );
    return accepted_athletes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const get_candidates = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Athletes", axiosConfig);
    const candidates = response.data.filter(
      (user) => user.athlete_status === "Candidato"
    );
    return candidates;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_Athlete = async (id, athleteData) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/Athletes/${id}`,
      athleteData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating athlete with ID ${id}:`, error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_Athlete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/Athletes/${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    console.error(`Error deleting athlete with ID ${id}:`, error);
    throw error;
  }
};

export default { post_Athlete, get_Athletes, get_accepted_athletes, get_candidates, update_Athlete, delete_Athlete };