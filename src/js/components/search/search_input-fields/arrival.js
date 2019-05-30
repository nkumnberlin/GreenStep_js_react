import React from 'react';
import {Form} from "semantic-ui-react";


export const Arrival = (style) => {
    return(
        <Form>
            <Form.Input id={'arrival'}
                        placeholder={'Arrival'}
                        style={style}
            />
        </Form>
    )
};