import React from 'react';
import lBolt from '../img/lBolt.png';

const LightSpeed = (props) => (
	<img src={lBolt} alt="lightning-speed" style={{height: "30px", position: "absolute", left: props.left + 'px', top: props.top + 'px', margin: "0"}} />
);

export default LightSpeed;