import React, {Component} from 'react';
import {Form} from "semantic-ui-react";


const form_style = {
    margin: '0 auto',
    maxWidth: 800,
};


export default class Arrival extends Component{
    render() {
        return (
            <Form.Input id={'arrival'}
                        placeholder={'Arrival'}
                        style={form_style}
                        onChange={this.props.actionArrival}
                        value={this.props.valueArrival}
<<<<<<< HEAD
                        autoComplete={this.props.complete}
=======
>>>>>>> test_2
            />
        )
    }
}

//
// export default class Arrival extends Component{
//     constructor(props) {
//         super(props);
//     }
//
//
//     handleScriptLoad() {
//         this.arrival = new google.maps.places.Autocomplete(
//             document.getElementById('arrival'));
//         this.arrival.setFields(this.fields);
//         this.arrival.addListener('place_changed', this.handleArrival);
//     };
//     fields = ['address_components', 'geometry', 'icon', 'name'];
//
//
//     render(){
//         return(
//         <Form>
//             <Script
//             url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM&libraries=places"
//             onLoad={this.handleScriptLoad}
//         />
//             <Form.Input id={'arrival'} placeholder={'Arrival'}
//                         style={form_style}/>
//         </Form>
//         )
//     }
// }