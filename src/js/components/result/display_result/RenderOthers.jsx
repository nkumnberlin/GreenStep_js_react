import React, {Component} from 'react';
import {iconTranslator} from "../../data_handler/Converter.jsx";
import {renderTotal, renderHeaderOfIcon,} from './render_result/RenderResults.jsx'
import {Segment, Grid,  Icon} from 'semantic-ui-react'


class RenderOthers extends Component {


    renderResultsOthers = currentType => {
        return (
            <>
                {renderTotal(currentType)}
                {this.renderIconsOthers(currentType)}
            </>
        )
    };



    renderIconsOthers = (currentType) => {
        return (
            <>
                {renderHeaderOfIcon("Direct")}
                <Segment>
                    <br/>
                    <Grid centered>
                        {this.renderIconsOfOthers(currentType)}
                    </Grid>
                    <br/>
                </Segment>
            </>
        )
    };

    renderIconsOfOthers = (currentType) => {
        return (
            <>
                <Icon.Group size={"huge"}>
                    <Icon name={iconTranslator(currentType.travel_mode)} style={{marginRight: 30}}/>
                </Icon.Group>
            </>
        )
    };


    render() {
        return (
            <div>
                {this.renderResultsOthers(this.props.others)}
            </div>
        );
    }
}


export default RenderOthers;
