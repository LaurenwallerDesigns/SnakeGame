import React from 'react';

const BreakPoint = (props) => (
	<div style={{position: "absolute", left: window.innerWidth * 0.5 + 'px', top: window.innerHeight * 0.4}}>
		<h1 style={{textAlign: "center", marginTop: "0"}}> Snake Game </h1>
		<p style={{textAlign: "center"}}> This demo can only be used on a desktop </p>
	</div>
);

export default BreakPoint;