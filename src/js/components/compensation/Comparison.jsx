import React, {Component, Fragment} from 'react';
import { Segment, Button, Progress, Grid, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {adjustEmissionValues, daysHoursMinutes,
    distanceInKm, iconTranslator} from "../data_handler/Converter.jsx";
import {GridVerticallyDivided} from "./ComparisonGrid.jsx";
import {equalsTrain} from './ComparisonCalculator.js';

export default class Comparison extends Component {

	constructor(props) {
		super(props)
	}

	renderComparison = (typeOfTravel, resultData) => {
		if(resultData !== undefined) {	
			//console.log("Fahrten Berlin-Köln: " + equalsTrain(200));
			const {driving, walking, cycling, flight, transit} = resultData;

			switch (typeOfTravel.toString()) {
                case "Plane":
                    return (
                        <Fragment>
							{GridVerticallyDivided(flight.emission)}
						</Fragment>
                    )
                case "Train":
                    return (
                        <Fragment>
							{GridVerticallyDivided(transit.emission)}
						</Fragment>
                    )
                case "Male":
                    return (
                        <Fragment>
							{GridVerticallyDivided(walking.emission)}
						</Fragment>
                    )
                case "Car":
                    return (
                        <Fragment>
							{GridVerticallyDivided(driving.emission)}
						</Fragment>
                    )
                case "Bicycle":
                    return (
                        <Fragment>
							{GridVerticallyDivided(cycling.emission)}
						</Fragment>
                    )
            }
		}
	};

	


	render() {
	
		return(
			<>
				{this.renderComparison(this.props.clickedItem, this.props.resultData)}
			</>
		)
	};
}