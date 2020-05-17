import React from 'react';
import SpeedUpFeat from '../img/fastBall.png';

const SpeedUp = (props) => (
	<img src={SpeedUpFeat} alt="fast-ball" style={{height: "20px", position: "absolute", left: props.left + 'px', top: props.top + 'px', margin: "0"}} />

);

export default SpeedUp;