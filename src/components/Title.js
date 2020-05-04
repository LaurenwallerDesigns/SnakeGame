import React from 'react';
import LevelNumber from './LevelNumber';

function Title(props){
	return(
		<div>
			<h1 className="title"> Snake </h1>
			<LevelNumber
				level={props.level} />
		</div>
	);
}


export default Title;