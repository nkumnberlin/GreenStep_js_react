import React, { Component } from "react";
import axios from "axios";
import {Button, Grid} from "semantic-ui-react";

export default class PythonPost extends Component {
        state = {
        };


    //dest: {lat: 52.65182, lng: 8.126700000000028}
    //arr: {lat: 52.50386, lng: 13.509410000000003}


    async postCords() {
        const cords = {
            d_lat:52.65182,
            d_lng: 8.126700000000028,
            a_lat: 52.50386,
            a_lng: 13.509410000000003
        };

        axios.post(`http://127.0.0.1:8000/postLatLng/`, { cords })
            .then(res => {
                console.log(res);
                console.log(res.data);

            })
    };

    render() {
        return (
            <div>
                <Button positive onClick={this.postCords}> SEARCH </Button>
            </div>
        )
    }
}