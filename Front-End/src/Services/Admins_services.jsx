import axios from "axios";

//----------------------------------Post-------------------------------//
const post_Admins = async (Admin_Data) => {
    try {
        const response = await axios.post("http://localhost:3000/Admins", Admin_Data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error posting Admin", error);
        throw error;
    }
};


//----------------------------------Get-------------------------------//
const get_Admins = async () => {
    try {
        const response = await axios.get("http://localhost:3000/Admins");
        return response.data; 
    } catch (error) {
        console.error("Error fetching Admins:", error);
        throw error;
    }
};



export default { post_Admins, get_Admins };