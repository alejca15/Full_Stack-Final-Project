import axios from "axios";

let post_Address = async (Address_data) => {

    try {
        let response = await fetch("http://localhost:3000/Addresses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Address_data),
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
}


//----------------------------------Get-------------------------------//
const get_Adresses = async () => {
    try {
        const response = await axios.get("http://localhost:3000/Addresses");
        return response.data; 
    } catch (error) {
        console.error("Error fetching Addresses:", error);
        throw error;
    }
};


export default {post_Address,get_Adresses};