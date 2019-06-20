import React from 'react';
import {Image, Segment} from 'semantic-ui-react';

const Title = () => (

    //font type: CG Triumvirate Extra Compressed by Monotype
        <Image className={'title prob'} src='../Images/greenstep_logo.jpg' fluid rounded centered />
);

export default Title;

export const LowerTitle = () =>(
    <Image className={'title prob'} src='../Images/greenstep_lowerpart.jpg' fluid rounded centered />
)