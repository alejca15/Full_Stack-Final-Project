import axios from "axios";

//-----------------------Post----------------------------//
let post_Direction = async (Direction_data) => {
  try {
    const response = await axios.post("http://localhost:3000/Directions", Direction_data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};


//-----------------------Get----------------------------//
let get_Directions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Directions");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export default { post_Direction, get_Directions };