import axios from 'axios';

let get_Sizes = async () => {
    try {
        const response = await axios.get("http://localhost:3000/Athletessizes");
        return response.data; 
    } catch (error) {
        throw new Error("Fetch was not possible: " + error.message);
    }
};



export default {get_Sizes , post_AthleteSizes};