import axios from "axios";

//----------------------------------Post-------------------------------//
const post_mentors = async (Mentor_data) => {
    try {
        const response = await axios.post("http://localhost:3000/Mentors", Mentor_data, {
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
const get_mentors = async () => {
    try {
        const response = await axios.get("http://localhost:3000/Mentors");
        return response.data; 
    } catch (error) {
        console.error("Error fetching Mentors:", error);
        throw error;
    }
};



export default { post_mentors, get_mentors };