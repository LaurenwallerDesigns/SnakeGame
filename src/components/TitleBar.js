import React from 'react';
import LifeCounter from './LifeCounter';
import Title from './Title';
import DotCount from './DotCount';
import LevelUp from './LevelUp';

function TitleBar(props){
	return (
			<div className="title-bar">
				<LifeCounter
					livesCount={props.livesCount} />
					{props.timer}
				<LevelUp
					levelUpGoal={props.levelUpGoal} />
				<Title
					level={props.level} />
				<DotCount
					dotCount={props.dotCount} />
			</div>

	);
}

export default TitleBar;