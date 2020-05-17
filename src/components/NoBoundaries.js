import React from 'react';
import NoBoundariesFeat from '../img/noBoundaries.png';

const NoBoundaries = (props) => (
	<img src={NoBoundariesFeat} alt="No Boundaries" style={{height: "40px", position: "absolute", left: props.left + 'px', top: props.top + 'px', marginTop: "0"}} />

);

export default NoBoundaries;