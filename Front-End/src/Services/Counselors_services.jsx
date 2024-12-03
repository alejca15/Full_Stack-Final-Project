import axios from "axios";

//----------------------------------Post-------------------------------//
const post_counselor = async (Counselor_Data) => {
    try {
        const response = await axios.post("http://localhost:3000/Counselors", Counselor_Data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error posting counselor:", error);
        throw error;
    }
};


//----------------------------------Get-------------------------------//
const get_counselors = async () => {
    try {
        const response = await axios.get("http://localhost:3000/Counselors");
        return response.data; 
    } catch (error) {
        console.error("Error fetching Counselors:", error);
        throw error;
    }
};



export default { post_counselor, get_counselors };