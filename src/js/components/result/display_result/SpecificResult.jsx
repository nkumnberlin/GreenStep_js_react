import React, {Component} from 'react';

class SpecificResult extends Component {
    constructor(props) {
        super(props);
        this.completeResults = this.props.completeResults;
        console.log("dies ist completeRes: ", this.completeResults)
    }
    extractSteps = completeResults => {
        Object.keys(completeResults).map((key) => {
            console.log("div: " ,key);
            Object.values(completeResults).map((ke, diveInSteps) => {
                console.log("kkkk: ", ke, "divein", diveInSteps)
                Object.values(ke.steps[diveInSteps]).map((StepsOfCurrentResult) => {
                    console.log("diveInResults", ke, "val", StepsOfCurrentResult)
                    // console.log("key",key)
                    // console.log("diveInSteps", diveInSteps)

                    // extractStep.push({StepsOfCurrentResult});
                })
            });
        });
    };

    // extractValuesOfSteps = Object.values(extractSteps.steps).map((ValuesOfSteps, value) => {
    //     console.log("key", ValuesOfSteps, " val:", value);
    //
    //     Object.values(ValuesOfSteps).map((k, va) => {
    //         console.log("end:", k.end_location, "start:", k.start_location)
    //     })
    // });


    render() {


        // let extractedStep = extractSteps;



        return (
            <div>
                {console.log("DIES IST extractedStep: " , this.extractSteps(this.completeResults))}
            </div>
        );
    }
}

export default SpecificResult;