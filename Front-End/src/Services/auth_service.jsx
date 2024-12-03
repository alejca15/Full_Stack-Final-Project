import axios from "axios";

//----------------------------------Post-------------------------------//

const post_login = async (Athlete_Data) => {
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
