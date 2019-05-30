import React from 'react';
import {Form} from "semantic-ui-react";

export const Departure = (style) => {
 return(
     <Form>
         <Form.Input id="departure"
                     label={'Departure'}
                     placeholder="Departure"
                     style={style}
         />
     </Form>
 )
}