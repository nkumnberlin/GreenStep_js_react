import React, {createRef} from 'react';
import {Image, Sticky, Ref} from 'semantic-ui-react';


//font type: CG Triumvirate Extra Compressed by Monotype
const Title = () => (
        <Image className={'title prob'} src='../Images/greenstep_logo.jpg' fluid rounded centered/>
);

export default Title;

export const LowerTitle = () => (
    <Image className={'title prob'} src='../Images/greenstep_lowerpart.jpg' fluid rounded centered/>
);