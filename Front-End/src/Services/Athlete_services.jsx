import axios from "axios";

//----------------------------------Post-------------------------------//

const post_Athlete = async (Athlete_Data) => {
    try {
        const response = await axios.post("http://localhost:3000/Athletes", Athlete_Data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
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



export default { post_Athlete, getAthletes };