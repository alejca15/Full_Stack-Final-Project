let post_Athlete = async (Athlete_Data) => {

    try {
        let response = await fetch("http://localhost:3000/Athletes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Athlete_Data),
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export default post_Athlete;