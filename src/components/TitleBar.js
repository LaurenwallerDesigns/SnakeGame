import React from 'react';
import LifeCounter from './LifeCounter';
import Title from './Title';
import DotCount from './DotCount';

function TitleBar(props){
	return (
			<div className="title-bar">
				<LifeCounter
					livesCount={props.livesCount} />
					{props.timer}
				<Title
					 />
				<DotCount
					dotCount={props.dotCount} />
			</div>

	);
}

export default TitleBar;