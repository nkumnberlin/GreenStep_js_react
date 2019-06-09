import React, {Component, Fragment} from 'react';
import { Segment, Button, Progress, Grid, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {adjustEmissionValues, daysHoursMinutes,
    distanceInKm, iconTranslator} from "../data_handler/Converter.jsx";
import {GridVerticallyDivided} from "./ComparisonGrid.jsx"
import {equalsTrain} from './ComparisonCalculator.js'

export default class Comparison extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		console.log("Fahrten Berlin-Köln: " + equalsTrain(200));
		return(
			<Fragment>
				{GridVerticallyDivided()}
			</Fragment>
		)
	};
}