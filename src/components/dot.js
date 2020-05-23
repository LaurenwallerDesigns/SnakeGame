import React from 'react';
import circle from '../img/dot.png';

const Dot = (props) => (
	<img src={circle} alt="dot" className={props.class} style={{marginTop: "auto", marginBottom: "auto", backgroundColor:"#" + props.color, width: "20px", height: "20px"}} />

);

export default Dot;