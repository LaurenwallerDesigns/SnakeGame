import React from 'react';
import NoBoundariesFeat from '../img/noBoundaries.png';

const NoBoundaries = (props) => (
	<img src={NoBoundariesFeat} alt="No Boundaries" style={{height: "20px", width: "20px", position: "absolute", left: props.left + 'px', top: props.top + 'px'}} />

);

export default NoBoundaries;