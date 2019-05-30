export const determineMaxEmission = (completeResults) => {
    let em = Object.values(completeResults).map(key => {
        let array = [];
        array.push(key.emission);
        return array;
    });
    return Math.max(...em);
};