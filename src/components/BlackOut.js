import React from 'react';
import BlackOutFeat from '../img/blackOut.png';

const BlackOut = (props) => (
	<img src={BlackOutFeat} alt="black-out-feature" style={{height: "20px", position: "absolute", left: props.left + 'px', top: props.top + 'px', marginTop:"100px"}} />

);

export default BlackOut;