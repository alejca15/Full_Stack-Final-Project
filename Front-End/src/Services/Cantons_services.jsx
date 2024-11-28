let getCantons = async () => {
    return new Promise(async (resolve, reject) => {
        let response = await fetch("http://localhost:3000/Cantons");
        if (response) {
            let car = await response.json();
            return resolve(car);
        }
        else return reject(new Error("Fetch was not possible"))
    });
};

export default getCantons;