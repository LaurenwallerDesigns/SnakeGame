import React from 'react';
import LifeCounter from './LifeCounter';
import Title from './Title';
import DotCount from './DotCount';

function TitleBar(props){
	return (
			<div className="title-bar">
				<LifeCounter />
				<Title />
				<DotCount />
			</div>

	);
}

export default TitleBar;