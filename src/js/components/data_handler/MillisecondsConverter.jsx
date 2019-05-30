
export const daysHoursMinutes =(time)=> {
    let num = time / 60;
    let hours = (num / 60);
    let rHours = Math.floor(hours);
    let minutes = (hours - rHours) * 60;
    let rMinutes = Math.round(minutes);
    return rHours + "h " + rMinutes + " min.";
};