import React, {Component} from 'react';

import SearchBar from 'material-ui-search-bar';
import Script from 'react-load-script';
import Autocomplete from 'react-google-autocomplete';
import {Segment, Grid, Form, Button} from 'semantic-ui-react'

export default class LocationSearchInput extends Component {
    // Define Constructor
    constructor(props) {
        super(props);

        // Declare State
        this.state = {
            city: '',
            query: ''
        };

        // Bind Functions
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

    }

    handleScriptLoad() {
        // Declare Options For Autocomplete
        var options = {
            types: ['(cities)'],
        };n

        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            options,
        );

        // Fire Event when a suggested name is selected
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    }

    handlePlaceSelect() {

        // Extract City From Address Object
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;

        // Check if address is valid
        if (address) {
            // Set State
            this.setState(
                {
                    city: address[0].long_name,
                    query: addressObject.formatted_address,
                }
            );
        }
    }

    render() {
        return (
            <div>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDo6leoat6ziQnl9n6oIsgYwSz5BopUfPM&libraries=places"
                    onLoad={this.handleScriptLoad}
                />
                <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
                           style={{
                               margin: '0 auto',
                               maxWidth: 800,
                           }}
                />
            </div>
        );
    }
}
/*
render() {
    return (

        <Autocomplete
            style={{maxWidth: 1400, height: 40}}
            onPlaceSelected={(place) => {
                console.log(place);
            }}
            types={['(regions)']}
            placeholder="Departure"
            componentRestrictions={{country: "de"}}
        />

        /*
        <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}

        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <Segment>
                    <Form.Input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';

                            // inline style for demonstration purpose

                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer', pac-item  }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                    </Segment>
                </div>
            )}
        </PlacesAutocomplete>
        */
//);
//}

/*
<div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                    : {backgroundColor: '#ffffff', cursor: 'pointer'};
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
 */


/*
 <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
 */
