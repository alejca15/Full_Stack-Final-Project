import axios from "axios";

//----------------------------------Post-------------------------------//
const post_Location = async (Location_Data) => {
    try {
        const response = await axios.post("http://localhost:3000/Locations", Location_Data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error posting Location", error);
        throw error;
    }
};


//----------------------------------Get-------------------------------//
const get_Locations = async () => {
    try {
        const response = await axios.get("http://localhost:3000/Locations");
        return response.data; 
    } catch (error) {
        console.error("Error fetching Locations:", error);
        throw error;
    }
};



export default { post_Location, get_Locations };