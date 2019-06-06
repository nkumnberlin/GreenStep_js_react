import React from "react";
import axios from "axios";

async function getDistance(cords) {

    const ValuesOfCords = Object.values(cords);
    if (!(ValuesOfCords.includes(undefined))) {

        console.log("Posting now: ", cords);
        let response = await axios.post(`http://127.0.0.1:8000/getDistance/`, {cords})
            .then(res => {
                    response = res;
                    return response
                }
            );
        if (response !== undefined) {
            return response;
        }
    }
}

export async function postCords(props) {

    const cords = {
        d_lat: props.departure.lat,
        d_lng: props.departure.lng,
        a_lat: props.arrival.lat,
        a_lng: props.arrival.lng
    };

    // const cords = {
    //     d_lat: 53.07929619999999,
    //     d_lng: 8.801693600000021,
    //     a_lat: 52.52000659999999,
    //     a_lng: 13.404953999999975
    // };
//
    //     let currentDistance = getDistance(cords);
    //     console.log("CURRENT DISTANCE IS: ", currentDistance);
    //     return currentDistance;
    // }
    console.log("Posting now: ", cords);
    let response;
    const ValuesOfCords = Object.values(cords);
    ValuesOfCords.includes(undefined) ?
        console.log("ERROR") :
        response = await axios.post(`http://127.0.0.1:8000/getTravelData/`, {cords})
            .then(res => {
                    response = res;
                    return response
                }
            );
    return response;
}
