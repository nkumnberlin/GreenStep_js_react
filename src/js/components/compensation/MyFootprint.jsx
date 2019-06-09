import React, {Component, Fragment} from 'react';
import { Button, Progress } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {adjustEmissionValues, daysHoursMinutes,
    distanceInKm, iconTranslator} from "../data_handler/Converter.jsx";


export default class MyFootprint extends Component {

	state = { 
		percentTrip: 3
	}

	constructor(props) {
		super(props)
	}

	render() {
		return(
			<Fragment>
				<div className="ui segments">
				  <div className="ui segment">
				    <h3>Mein CO2 Fußabdruck</h3>
				  </div>
				  <div className="ui segment">
				    <p className="footprint-title">Meine Streckenemission: {/*adjustEmissionValues(currentType.emission)*/}</p>
					    <div className="ui grid">
	  						<div className="two wide column">
	  							<Progress percent={this.state.percentTrip} color="teal">0,031t CO2</Progress>
	  						</div>
	  					</div>
				  </div>
				  <div className="ui segment">
				    <p className="footprint-title">So viel sollte eine Person maximal pro Jahr verursachen, um den Klimawandel zu stoppen:</p>
				    	<div className="ui grid">
	  						<div className="two wide column">
	  							<Progress percent={100} color="green">0,600t CO2</Progress>
	  						</div>
	  					</div>
				  </div>
				  <div className="ui segment">
				    <p className="footprint-title">So viel CO2 verursacht eine Person in der EU im Durchschnitt pro Jahr:</p>
				    	<div className="ui grid">
	  						<div className="sixteen wide column">
	  							<Progress percent={100} color="red">8,4t CO2</Progress>
	  						</div>
	  					</div>
				  </div>
				</div>
			</Fragment>
		)
	};
}