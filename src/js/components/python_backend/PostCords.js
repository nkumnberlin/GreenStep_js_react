import React from "react";
import axios from "axios";


const distanceTable = async (dist, cords) => {
    dist = dist / 1000;
    let recommendation = "";
    if (dist <= 5) {
        console.log("5");
        postCalls(cords, `http://127.0.0.1:8000/getWalking/`).then((result) => {
            recommendation = result;
        })

    } else if (dist <= 30) {
        console.log("30")
        postCalls(cords, `http://127.0.0.1:8000/getCycling/`).then((result) => {
            recommendation = result;
        })
    } else if (dist <= 500) {
        console.log("500")
        postCalls(cords, `http://127.0.0.1:8000/getTransitAndDriving/`).then((result) => {
            recommendation = result;
        })
    } else if (dist > 500) {
        postCalls(cords, `http://127.0.0.1:8000/getTransitDrivingAndFlying/`).then((result) => {
            recommendation = result;
        })
    }
    return recommendation;
};

async function createSpecificCall(cords) {
    const ValuesOfCords = Object.values(cords);
    if (!(ValuesOfCords.includes(undefined))) {
        console.log("Postin now: ", cords);
        let response = await axios.post(`http://127.0.0.1:8000/getDistance/`, {cords})
            .then(res => {
                    response = distanceTable(res.data.distance, cords);
                    return response
                }
            );
        if (response !== undefined) {
            return response;
        }
    }
}

export async function postCords(props) {

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
    // let expectedResult = "";
    // createSpecificCall(cords).then((result)=>{
    //     expectedResult = result;
    // });
    // console.log("DIE CALLS HABEN ERGEBEN: ", expectedResult)
    // return expectedResult;
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

async function postCalls(cords, calls) {
    let response = await axios.post(calls, {cords})
        .then(res => {
                console.log("RES: ", res)
                response = res.data;
                return response
            }
        );
}
