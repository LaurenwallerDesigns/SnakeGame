import React from 'react';
import './index.css';
import BreakPoint from './components/BreakPoint';
import HasError from './components/HasError';
import StartButton from './components/StartButton';
import Dot from './components/dot';
import TitleBar from './components/TitleBar';
import PauseDisplay from './components/PauseDisplay';
import GoalMade from './components/GoalMade';
import LoseLife from './components/LoseLife';
import GameOver from './components/GameOver';
import LightSpeed from './components/LightSpeed';
import BlackOut from './components/BlackOut';
import SpeedUp from './components/SpeedUp';
import Bomb from './components/Bomb';
import GainALife from './components/GainALife';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 30,
      cols: 40,
      grid: [],
      food: Array(10).fill(null),
      snake: {
        head: {},
        tail: []
      },
      currentDirection: 'up',
      tickTime: 1000
    };
    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    //move snake listener
    document.body.addEventListener('keydown', this.keyPress);
    //setting intial state
    this.setState((state) => {
      const newState = {
        ...state,
        food: this.getRandomGrid(),
        snake: {
          head: this.getCenterOfGrid(),
          tail: state.snake.tail
        }
      };
      const grid = this.renderGrid(newState, true);
      return {
        ...newState,
        grid
      }
    });
    this.renderGrid();
    //interval for snake moving
    window.fnInterval = setInterval(() => {
      this.gameTick();
    }, this.state.tickTime);
  }

  componentWillUnmount() {
    //move snake remover
    document.body.removeEventListener('keydown', this.keyPress);
    clearInterval(window.fnInterval);
  }

  //render grid
  renderGrid(state = {}, sendback = false) {
    if(!Object.keys(state).length){
      state = this.state;
    }
    const grid = [];
    const {
      rows,
      cols,
      food,
      snake
    } = state;
    console.log(snake.tail.row);
    for(let row = 0; row < this.state.rows; row++) {
      for(let col = 0; col < this.state.cols; col++){
        //const isFood = (food.row === row && food.col === col);
        const isHead = (snake.head.row === row && snake.head.col === col);
        const color = food.color;
        let isFood = false;
        food.forEach(f => {
          console.log(row);
        })
        let isTail = false;
        snake.tail.forEach(t => {
          if(t.row === row && t.col === col) {
            isTail = true;
            console.log(t);
          }
        })
        console.log(isFood);
        grid.push({
          row,
          col,
          isFood,
          color,
          isHead,
          isTail
        })
      }
    }
    if(sendback) {
      return grid;
    }else {
      this.setState({
      grid
    });
  }
}
  //get center of grid for displaying snake head
  getCenterOfGrid() {
    return {
      row: Math.floor((this.state.rows - 1) / 2),
      col: Math.floor((this.state.cols - 1) / 2)
    }
  }
  //random food display
  getRandomGrid() {
    this.food = this.state.food.map((piece, index) => {
      return{
        col: Math.floor((Math.random() * this.state.cols)),
        row: Math.floor((Math.random() * this.state.rows)),
        color: Math.floor(Math.random()*16777215).toString(16)
 
    }
    });
    return this.food
  }


  //Tick Function

  gameTick() {
    this.setState((state) => {
      let {
        currentDirection,
        snake,
        food
      } = state;

      let {
        tail
      } = snake;

      const {
        row,
        col
      } = state.snake.head;

      let head = {
        row,
        col
      };

      //snake eats
      tail.unshift({
        row: head.row,
        col: head.col
      })

      if(head.row === state.food.row && head.col === state.food.col){
        food = this.getRandomGrid();
      }else{
        tail.pop();
      }

      switch (currentDirection) {
      case 'left':
      head.col--;
      break;

      case 'up':
      head.row--;
      break;

      case 'down':
      head.row++;
      break;

      case 'right':
      head.col++;
      break;
    }
    const newState = {
      ...state,
      food,
      snake: {
        head,
        tail
      }
    }
    const grid = this.renderGrid(newState, true);
    return {
      ...newState,
      grid
    }
    });
  }

    keyPress(evt) {
      let { currentDirection } = this.state;
    switch (evt.keyCode) {
      //left arrow
      case 37: 
        currentDirection = 'left';
      break;

      //right arrow
      case 39:
        currentDirection = 'right';
      break;

      //up arrow
      case 38:
        currentDirection = 'up';
      break;

      //down arrow
      case 40:
        currentDirection = 'down';
      break;

      case 13:
        currentDirection = 'pause';
      break;
    }
    const newState = {
      ...this.state,
      currentDirection,
    }
    const grid = this.renderGrid(newState, true);

    this.setState(state => {
      return {
        ...newState,
        grid
      }
    })
  }


  render() { 
    const grid = this.state.grid;
    this.grid = grid.map((cell, index)=> {
      if(cell.isFood){
        return <div
        key={cell.row+index+ '-' + cell.col}
        className={cell.isFood ? "grid-item is-food" : "grid-item"} ><Dot
                                                                      color={cell.color} /></div>
      }else if(cell.isHead){
        return <div
        key={cell.row+index+ '-' + cell.col}
        className={cell.isHead ? "grid-item is-head blink-animation" : "grid-item"} ><Dot /></div>
      }else if(cell.isTail){
        return <div
        key={cell.row+index+ '-' + cell.col}
        className={cell.isTail ? "grid-item is-tail" : "grid-item"} ><Dot /></div>
      }
      else{
      return <div
        key={cell.row+index+ '-' + cell.col}
        className="grid-item" ></div>
      }
    })
    return (
      <div id="game-board" className={this.state.closeCall ? 'redBorder': ""} style={{height: this.height + 'px', width: this.width + 'px', backgroundColor: this.state.backgroundColor}} >
        <div id='grid'>
        {this.grid}
        </div>
      </div>

    );
  }
}


export default App;
