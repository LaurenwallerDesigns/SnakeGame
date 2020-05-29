import React from 'react';
import BombFeat from '../img/Bomb.png';

const Bomb = (props) => (
	<img src={BombFeat} alt="bomb" style={{height: "20px", width: "20px", position: "absolute", left: props.left + 'px', top: props.top + 'px'}} />

);

export default Bomb;