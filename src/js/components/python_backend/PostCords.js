import React from "react";
import axios from "axios";

export default async function controlDistance(props) {

    // const cords = {
    //     d_lat: props.departure.lat,
    //     d_lng: props.departure.lng,
    //     a_lat: props.arrival.lat,
    //     a_lng: props.arrival.lng
    // };

    const cords = {
        d_lat: 53.07929619999999,
        d_lng: 8.801693600000021,
        a_lat: 52.52000659999999,
        a_lng: 13.404953999999975
    };


    let response = axios.post(`http://127.0.0.1:8000/getDistance/`, {cords})
        .then(res => {
                return distanceTable(res.data.distance);
            }
        );
    console.log(response)
    return response;
};

export const distanceTable = async (dist) => {
    dist = dist / 1000;
    let recommendation = [];
    if (dist <= 5) {
        console.log("5");
        recommendation = ["Male"]
    } else if (dist <= 30) {
        console.log("30");
        recommendation = ["Male", "Bicycle"]
    } else if (dist <= 500) {
        console.log("500");
        recommendation = ["Car", "Train"]
    } else if (dist > 500) {
        recommendation = ["Car", "Train", "Plane"]
    }
    return recommendation;
};

export async function postCords(props, url) {

    // const cords = {
    //     d_lat: props.departure.lat,
    //     d_lng: props.departure.lng,
    //     a_lat: props.arrival.lat,
    //     a_lng: props.arrival.lng
    // };

    const cords = {
        d_lat: 53.07929619999999,
        d_lng: 8.801693600000021,
        a_lat: 52.52000659999999,
        a_lng: 13.404953999999975
    };


    console.log("Posting now: ", cords);

    let response = axios.post(url, {cords})
        .then(res => {
                console.log("res!!", res)
                return res
            }
        );

    return response;
}


