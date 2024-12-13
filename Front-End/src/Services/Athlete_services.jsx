import axios from "axios";

//----------------------------------Post-------------------------------//

const post_Athlete = async (Athlete_Data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/Athletes",
      Athlete_Data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting athlete:", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//

const getAthletes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Athletes");
    return response.data;
  } catch (error) {
    console.error("Error fetching athletes:", error);
    throw error;
  }
};

const get_accepted_athletes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Athletes");
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
      const response = await axios.get("http://localhost:3000/Athletes");
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
const updateAthlete = async (athleteData) => {
  try {
    const id=athleteData.id;
    const response = await axios.put(
      `http://localhost:3000/Athletes/${id}`,
      athleteData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating athlete with ID ${id}:`, error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const deleteAthlete = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/Athletes/${id}`
    );
    return response.status === 204 ? "Atleta eliminado con éxito" : null;
  } catch (error) {
    console.error(`Error deleting athlete with ID ${id}:`, error);
    throw error;
  }
};

export default {
  post_Athlete,
  getAthletes,
  get_accepted_athletes,
  get_candidates,
  updateAthlete,
  deleteAthlete,
};
