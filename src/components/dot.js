import React from 'react';

const Dot = (props) => (
	<p
		id={props.id}
		className={props.className ? 'blink-animation' : props.ranDot ? 'randomDots' : ''}
		style={{position: "absolute", left: props.left + "px", top: props.top + 'px', fontSize: '85px', color: props.color}}> . </p>
);

export default Dot;