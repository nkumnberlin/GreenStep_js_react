import React, {Component, Fragment} from 'react';
import { Segment, Button, Progress, Grid, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {adjustEmissionValues, daysHoursMinutes,
    distanceInKm, iconTranslator} from "../data_handler/Converter.jsx";
import {GridVerticallyDivided} from "./ComparisonGrid.jsx"

export default class Comparison extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return(
			<Fragment>
				{GridVerticallyDivided()}
			</Fragment>
		)
	};
}