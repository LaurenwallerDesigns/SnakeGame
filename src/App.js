import React from 'react';
import './index.css';
import BreakPoint from './components/BreakPoint';
import HasError from './components/HasError';
import StartButton from './components/StartButton';
import Dot from './components/dot';
import TitleBar from './components/TitleBar';
import PauseDisplay from './components/PauseDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GAME START STATE
      game: false,
      //DOTS RANDOMLY PLACED AROUND
      dots: [],
      //SNAKE
      snake: [],
      color: "#000000",
      //TITLE BAR STATE
      livesCount: 3,
      level: 1,
      position: [],
      dotCount: 1,
      levelUpGoal: 10,
      hitBoundary: false,
      dotDirection: "",
      pauseGame: false

    };
    this.startGame = this.startGame.bind(this);
    this.addDot = this.addDot.bind(this);
    this.randomDots = this.randomDots.bind(this);
    this.randomDotsMap = this.randomDotsMap.bind(this);
    this.boundaries = this.boundaries.bind(this);
    this.movingDot = this.movingDot.bind(this);
    this.moveHead = this.moveHead.bind(this);
    this.changeLeft = this.changeLeft.bind(this);
    this.changeRight = this.changeRight.bind(this);
    this.changeUp = this.changeUp.bind(this);
    this.changeDown = this.changeDown.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
  }

  componentDidMount() {
    this.addDot();
    this.randomDots();
    this.boundaries();
    window.addEventListener('keydown', this.movingDot);
    this.index = 0;
  }


//Unique IDs for snake body
  prevDotId = 0;

//Used for adding a dot to end of snake 
  addDot = (i) => {
    this.setState({
      snake: this.state.snake.concat([{
            id: this.prevDotId += 1,
            animation: true,
            left: window.innerWidth * 0.5,
            top: window.innerHeight * 0.5,
            color: this.state.color,
            dotDirection: "down"
      }]),
    });
  }

//Getting number of random dots
  randomDots() {
    this.ranNum = Math.floor(Math.random() * 20) + 1;
    console.log(this.ranNum);
    const arrayFill = {animation: false,
            left: window.innerWidth * 0.5,
            top: window.innerHeight * 0.5,
            color: this.state.color};
    this.setState({
      dots: Array(this.ranNum).fill(arrayFill)
    });
  }

//Boundaries for the screen
  boundaries() {
    this.topBoundary = window.innerHeight * 0.2;
    this.rightBoundary = window.innerWidth * 0.9;
    this.leftBoundary = window.innerWidth * 0.1;
    this.bottomBoundary = window.innerHeight * 0.9;
  }

//Onclick to start game
  startGame() {
    this.setState({
      game: true
    });
    this.randomDotsMap();
  }

  moveHead = () => {
    console.log(this.state.dotDirection);
    if(this.state.dotDirection === "down"){
      console.log('move head down ran');
      const snake = this.state.snake.slice();
      const topCurr = snake[0].top;
      snake[0].top = topCurr + 2;
       this.setState({
          snake: snake
       });
    }else if(this.state.dotDirection === "up"){
      console.log('move head down ran');
        const snake = this.state.snake.slice();
        const topCurr = snake[0].top;
        snake[0].top = topCurr - 2;
         this.setState({
            snake: snake
         });
    }else if(this.state.dotDirection === "left"){
        const snake = this.state.snake.slice();
        const leftCurr = snake[0].left;
        snake[0].left = leftCurr - 2;
         this.setState({
            snake: snake
         });
    } else if(this.state.dotDirection === "right"){
        const snake = this.state.snake.slice();
        const leftCurr = snake[0].left;
        snake[0].left = leftCurr + 2;
         this.setState({
            snake: snake
         });
    }
  }


  randomDotsMap() {
    //Map for random dots
    this.ranDots = this.state.dots.map((dot, index) =>
      <Dot 
        className={dot.animation}
        left={Math.floor(Math.random() * this.rightBoundary)}
        top={Math.floor(Math.random() * this.bottomBoundary)}
        color={"#" + Math.floor(Math.random()*16777215).toString(16)}
        />

    );
  }
  changeLeft() {
    clearInterval(this.interval);
    this.setState({
      dotDirection: "left"
    });
    this.interval = setInterval(this.moveHead, 100);
  }

  changeRight() {
    clearInterval(this.interval);
    this.setState({
      dotDirection: "right"
    });
    this.interval = setInterval(this.moveHead, 100);
  }

  changeUp() {
    console.log('up ran');
    clearInterval(this.interval);
    this.setState({
      dotDirection: "up"
    });
    this.interval = setInterval(this.moveHead, 100);
  }

  changeDown() {
    console.log('down Ran');
    clearInterval(this.interval);
    this.setState({
      dotDirection: "down"
    });
    this.interval = setInterval(this.moveHead, 100);
  }

  pauseGame() {
    clearInterval(this.interval);
    this.setState({
      pauseGame: true
    });
  }


  movingDot(evt) {
    switch (evt.keyCode) {
      //left arrow
      case 37: 
        this.changeLeft();
      break;

      //right arrow
      case 39:
      this.changeRight();
      break;

      //up arrow
      case 38:
      this.changeUp();
      break;

      //down arrow
      case 40:
      this.changeDown();
      break;

      case 13:
      this.pauseGame();
      break;
    }
  }

  render() {

//Map for collecting dots to the snake
    var snake = this.state.snake.map((dot, index) =>
      <Dot 
        id={index}
        className={dot.animation}
        left={dot.left}
        top={dot.top}
        color={dot.color}
        />

    );

    // if(this.state.pauseGame){
    //   var pause = <PauseDisplay />;
    // }else{
    //   var pause = null;
    // }

    return (
      <div>
        {this.state.game ?
          ( <React.Fragment>
              <TitleBar
                livesCount={this.state.livesCount}
                level={this.state.level}
                dotCount={this.state.dotCount}
                levelUpGoal={this.state.levelUpGoal} />
              <div id="snake">
                {snake}
              </div>
              <div id="ranDots">
                  {this.ranDots}
              </div>
            </React.Fragment>
           ) :
          (<StartButton 
            startGame={this.startGame}
            />
            )}
    </div>
    );
  }
}


export default App;
