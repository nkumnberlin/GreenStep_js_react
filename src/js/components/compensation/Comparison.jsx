import React, {Component, Fragment} from 'react';
import { Button, Progress, Grid } from 'semantic-ui-react'
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
				{GridVerticallyDivided}
			</Fragment>
		)
	}
}