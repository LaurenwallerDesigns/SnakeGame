import React from 'react';
import './index.css';
import BreakPoint from './components/BreakPoint';
import HasError from './components/HasError';
import StartButton from './components/StartButton';
import Dot from './components/dot';
import TitleBar from './components/TitleBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: false
    };
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.setState({
      game: true
    });
  }
  render() {
    return (
      <div>
        {this.state.game ?
          (<TitleBar />) :
          (<StartButton 
            startGame={this.startGame}
            />
            )}
    </div>
    );
  }
}


export default App;
