import axios from "axios";

//------------------POST-----------------------//
let post_AthleteSizes = async (sizes_data) => {
    try {
        const response = await axios.post("http://localhost:3000/Athletessizes", sizes_data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//------------------GET-----------------------//
let get_AthleteSizes = async () => {
    try {
        const response = await axios.get("http://localhost:3000/Athletessizes", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { post_AthleteSizes, get_AthleteSizes };