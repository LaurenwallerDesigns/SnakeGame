import React from 'react';

const HasError = (props) => (
	<div style={{position: "absolute", left: window.innerWidth * 0.5 + 'px', top: window.innerHeight * 0.4}}>
		<h1 style={{textAlign: "center", marginTop: "0"}}> Snake Game </h1>
		<p style={{textAlign: "center"}}> Sorry, something went wrong </p>
	</div>
);

export default HasError;