import React from 'react';
import SpeedUpFeat from '../img/fastBall.png';

const SpeedUp = (props) => (
	<img src={SpeedUpFeat} alt="fast-ball" style={{height: "30px", position: "absolute", left: props.left + 'px', top: props.top + 'px'}} />

);

export default SpeedUp;