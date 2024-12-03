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

export default post_Address;