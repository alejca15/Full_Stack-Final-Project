import axios from "axios";

//----------------------------------Post-------------------------------//
const post_parents = async (Parent_data) => {
    try {
        const response = await axios.post("http://localhost:3000/Parents", Parent_data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error posting Parent:", error);
        throw error;
    }
};


//----------------------------------Get-------------------------------//
const get_parents = async () => {
    try {
        const response = await axios.get("http://localhost:3000/Parents");
        return response.data; 
    } catch (error) {
        console.error("Error fetching Parents:", error);
        throw error;
    }
};



export default { post_parents, get_parents };