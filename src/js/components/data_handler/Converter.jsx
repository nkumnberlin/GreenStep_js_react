export const distanceInKm = (dist) => {
    return ((dist / 1000).toFixed(1) + "km")
};

export const determineMaxEmission = (completeResults) => {
    let em = Object.values(completeResults).map(key => {
        let array = [];
        array.push(key.emission);
        return array;
    });
    return Math.max(...em);
};



export const iconTranslator = travel_mode => {
    switch (travel_mode) {
        case "WALKING":
            return "male";
        case "TRANSIT":
            return "train";
        case "FLYING":
            return "plane";
        case "CYCLING":
            return "bicycle";
        case "DRIVING":
            return "car";
    }
};

export const daysHoursMinutes =(time)=> {
    let num = time / 60;
    let hours = (num / 60);
    let rHours = Math.floor(hours);
    let minutes = (hours - rHours) * 60;
    let rMinutes = Math.round(minutes);
    return rHours + "h " + rMinutes + "min.";
};

export const adjustEmissionValues = (emission) => {
    return (Math.round(emission * 100)/100) + "kg"
};