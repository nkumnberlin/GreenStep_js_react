import React, {Component, Fragment} from 'react';
import RenderTransit from './RenderTransit.jsx'
import RenderFlight from './RenderFlight.jsx'
import RenderOthers from './RenderOthers.jsx'

class SpecificResult extends Component {
    constructor(props) {
        super(props);
        this.completeResults = this.props.completeResults;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("IN SPECIFIC")

        console.log("prevpro:", prevProps)
        console.log("prevstate:", prevState)
        console.log("this props:", this.props)

    }

    renderDynamicResults = typeOfTravel => {
        switch (typeOfTravel.toString()) {
            case "Plane":
                return (
                    <RenderFlight
                        flight={this.completeResults.flight}/>);
            case "Train":
                return (
                    <RenderTransit
                        transit={this.completeResults.transit}/>);
            case "Male":
                return (
                    <RenderOthers
                        others={this.completeResults.walking}/>);
            case "Car":
                return (
                    <RenderOthers
                        others={this.completeResults.driving}/>);
            case "Bicycle":
                return (
                    <RenderOthers
                        others={this.completeResults.cycling}/>);
        }
    };

    render() {
        return (
            <Fragment>
                {this.renderDynamicResults(this.props.ActiveTravelItem)}
            </Fragment>
        );
    }
}

export default SpecificResult;