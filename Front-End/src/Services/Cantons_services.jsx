import axios from "axios";


//----------------------Get-------------------//
let getCantons = async () => {
  try {
    const response = await axios.get("http://localhost:3000/Cantons");
    return response.data;
  } catch (error) {
    throw new Error("No fue posible obtener los cantones: " + error.message);
  }
};


//----------------------Post-------------------//
let postCanton = async (cantonData) => {
    try {
      const response = await axios.post("http://localhost:3000/Cantons", cantonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("No fue posible crear el cantón: " + error.message);
    }
  };

  export default {getCantons,postCanton};