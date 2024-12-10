import axios from "axios";

let getCantons = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Cantons");
    return response.data;
  } catch (error) {
    throw new Error("No fue posible obtener los cantones: " + error.message);
  }
};

export default getCantons;
