import React, {Component} from 'react';

import {Segment, Grid, Form, Button} from 'semantic-ui-react'
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Departure from './departure.js'
import Arrival from './arrival.js'
import postCords from "../python_endpoint/PythonPost";
import GooglePlacesSuggest from "react-google-places-suggest"
import GoogleMapLoader from "react-google-maps-loader"
const MY_API_KEY = "AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM";


let data_export = "";


export default class Search extends Component {
    // Define Constructor
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            value: ""
        }
    }

    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    };

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        this.setState({search: "", value: geocodedPrediction.formatted_address})
    };

    handleNoResult = () => {
        console.log('No results for ', this.state.search)
    };

    handleStatusUpdate = (status) => {
        console.log(status)
    };

    render() {
        const {search} = this.state
        return (
            <GoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <GooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search,
                                // Optional options
                                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                            }}
                            // Optional props
                            onNoResult={this.handleNoResult}
                            onSelectSuggest={this.handleSelectSuggest}
                            onStatusUpdate={this.handleStatusUpdate}
                            textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                            <div>
                                             <Segment padded className={'search'}>
                                                 <Header textAlign={'center'} as='h3'> Plan your Trip and Compensate your Emission </Header>
                                                 <Grid>
                                                     <Grid.Row>
                                                         <Grid.Column width={12}>
                                                             <Form>
                                                                 <Departure
                                                                     action={this.handleInputChange}
                                                                     value={this.state.value}
                                                                 />
                                                             <Arrival
                                                                 actionArrival={this.handleInputChange}
                                                                 valueArrival={this.state.value}/>
                                                             </Form>
                                                         </Grid.Column>
                                                         <Grid.Column verticalAlign={'middle'} textAlign={'center'} width={4}>
                                                             <Button onClick={data_export = postCords} positive> Submit </Button>
                                                         </Grid.Column>
                                                     </Grid.Row>
                                                 </Grid>
                                             </Segment>
                                         </div>



                        </GooglePlacesSuggest>
                    )
                }
            />
        )
    }


    //
    // handleScriptLoad(){
    // console.log(this.props.departure);
    //     this.rawPlace = new google.maps.places.Autocomplete(
    //         document.getElementById('departure')
    //     );
    //     // this.rawPlace.setFields(this.fields);
    //     // this.rawPlace.addListener('place_changed', this.handleCords(element));
    // }
    //
    // handleCords(element){
    //     let place = this.rawPlace.getPlace();
    //         if (!place.geometry) {
    //             // User entered the name of a Place that was not suggested and
    //             // pressed the Enter key, or the Place Details request failed.
    //             console.log("No details available for input: '" + place.name + "'");
    //             return;
    //         }
    //         this.lat = place.geometry.location.lat();
    //         this.lng = place.geometry.location.lng();
    //         this.saveCoordinates(element)
    // }
    //
    // saveCoordinates(element){
    //     if(element.toString() === 'departure') {
    //         this.setState({
    //             Departure: {
    //                 lat: this.lat,
    //                 lng: this.lng
    //             }
    //         })
    //     }else{
    //         this.setState({
    //             Arrival: {
    //                 lat: this.lat,
    //                 lng: this.lng
    //             }
    //         })
    //     }
    // }
    //


    //
    // render() {
    //     return (
    //         <div>
    //             <Segment padded className={'search'}>
    //                 <Header textAlign={'center'} as='h3'> Plan your Trip and Compensate your Emission </Header>
    //                 <Grid>
    //                     <Grid.Row>
    //                         <Grid.Column width={12}>
    //                             <Form>
    //                             <Departure departure={this.handleScriptLoad()}/>
    //                             <Arrival/>
    //                             </Form>
    //                         </Grid.Column>
    //                         <Grid.Column verticalAlign={'middle'} textAlign={'center'} width={4}>
    //                             <Button onClick={data_export = postCords} positive> Submit </Button>
    //                         </Grid.Column>
    //                     </Grid.Row>
    //                 </Grid>
    //             </Segment>
    //         </div>
    //     );
    // }
}