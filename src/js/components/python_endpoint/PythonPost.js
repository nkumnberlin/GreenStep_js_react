import React, { Component } from "react";
import axios from "axios";
import {Button, Grid} from "semantic-ui-react";
import Result from "../result/Result";

export default class PythonPost extends Component {
        state = {
            test:[],
        };


    async postCords() {
        const cords = {
            d_lat:52.65182,
            d_lng: 8.126700000000028,
            a_lat: 52.50386,
            a_lng: 13.509410000000003
        };
        console.log("Posting now: " + cords);
        console.log(axios.post(`http://127.0.0.1:8000/postLatLng/`, {cords})
            .then(res =>
                console.log(res)));

    };

    render() {
        return (
            <div>
                <Button positive onClick={this.postCords}> SEARCH </Button>
            </div>
        )
    }
}