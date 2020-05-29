import React from 'react';
import GainLife from '../img/lifeHeart.png';

const GainALife = (props) => (
	<img src={GainLife} alt="gain a life" style={{height: "20px", width: "20px", position: "absolute", left: props.left + 'px', top: props.top + 'px'}} />

);

export default GainALife;