import React from 'react';
import BombFeat from '../img/Bomb.png';

const Bomb = (props) => (
	<img src={BombFeat} alt="bomb" style={{height: "30px", position: "absolute", left: props.left + 'px', top: props.top + 'px', margin: "0"}} />

);

export default Bomb;