import React from 'react';

const StartButton = (props) => (
	<button onClick={props.startGame} className="start-button" style={{top:window.innerHeight * 0.4 + 'px', left: window.innerWidth * 0.4 + 'px'}}> Start Game </button>
);

export default StartButton;