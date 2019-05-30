import {Progress} from "semantic-ui-react";
import React from "react";

export const ProgressBar = (emission, maxEm) => (
    <Progress progress='value' value={Math.round(emission)} total={Math.round(maxEm)} active>
    </Progress>
);
