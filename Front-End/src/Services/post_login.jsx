let post_login = async (credentials) => {
    try {
        let response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        
        throw error;
    }
}

export default post_login;