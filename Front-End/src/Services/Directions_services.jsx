let post_Direction = async (Direction_data) => {

    try {
        let response = await fetch("http://localhost:3000/Directions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Direction_data),
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export default post_Direction;