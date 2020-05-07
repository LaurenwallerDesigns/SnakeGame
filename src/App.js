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
      pauseGame: false,
      randomDotsCount: 0,

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
    this.overlapDots = this.overlapDots.bind(this);
    this.statePosition = this.statePosition.bind(this);
    this.between = this.between.bind(this);
    this.getSnakeMovePrevious = this.getSnakeMovePrevious.bind(this);
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
    if(this.state.hitDot){
      const snake = this.state.snake.slice();
      const snakeLength = snake[snake.length - 1];
      const snakeCurrIndex = snake.indexOf(snakeLength);
      const direction = snake[snakeCurrIndex].dotDirection;
      if(direction === "down"){
        this.leftAddedPos = snake[snakeCurrIndex].left;
        this.topAddedPos = snake[snakeCurrIndex].top - 15;
        this.setState({
              snake: this.state.snake.concat([{
                    id: this.prevDotId += 1,
                    animation: false,
                    left: this.leftAddedPos,
                    top: this.topAddedPos,
                    color: this.state.color,
                    dotDirection: direction
              }]),
            });
      }else if(direction === "left"){
        this.leftAddedPos = snake[snakeCurrIndex].left + 15;
        this.topAddedPos = snake[snakeCurrIndex].top;
        this.setState({
              snake: this.state.snake.concat([{
                    id: this.prevDotId += 1,
                    animation: false,
                    left: this.leftAddedPos,
                    top: this.topAddedPos,
                    color: this.state.color,
                    dotDirection: direction
              }]),
            });        
      }else if(direction === "right"){
        this.leftAddedPos = snake[snakeCurrIndex].left - 15;
        this.topAddedPos = snake[snakeCurrIndex].top;
        this.setState({
              snake: this.state.snake.concat([{
                    id: this.prevDotId += 1,
                    animation: false,
                    left: this.leftAddedPos,
                    top: this.topAddedPos,
                    color: this.state.color,
                    dotDirection: direction
              }]),
            }); 
      }else if(direction === "up"){
        this.leftAddedPos = snake[snakeCurrIndex].left;
        this.topAddedPos = snake[snakeCurrIndex].top - 15;
        this.setState({
              snake: this.state.snake.concat([{
                    id: this.prevDotId += 1,
                    animation: false,
                    left: this.leftAddedPos,
                    top: this.topAddedPos,
                    color: this.state.color,
                    dotDirection: direction
              }]),
            }); 
      }
    }else{
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
  }

//Getting number of random dots
  randomDots() {
    this.ranNum = Math.floor(Math.random() * 20) + 1;
    this.leftPos = Math.floor(Math.random() * this.rightBoundary);
    this.topPos = Math.floor(Math.random() * this.bottomBoundary);
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
    this.statePosition();
  }

  moveHead = () => {
    this.randomDotsMap();
    const x = 0;
    if(this.state.dotDirection === "down"){
      const snake = this.state.snake.slice();
      const topCurr = snake[x].top;
      snake[x].top = topCurr + 1;
      snake[x ].dotDirection = "down";
       this.setState({
          snake: snake
       });
       this.overlapDots();
    }else if(this.state.dotDirection === "up"){
      const snake = this.state.snake.slice();
      const topCurr = snake[0].top;
      snake[0].top = topCurr - 1;
      snake[0].dotDirection = "up";
       this.setState({
          snake: snake
       });
       this.overlapDots();
    }else if(this.state.dotDirection === "left"){
      const snake = this.state.snake.slice();
      const leftCurr = snake[0].left;
      snake[0].left = leftCurr - 1;
      snake[0].dotDirection = "left";
       this.setState({
          snake: snake
       });
       this.overlapDots();
    }else if(this.state.dotDirection === "right"){
      const snake = this.state.snake.slice();
      const leftCurr = snake[0].left;
      snake[0].left = leftCurr + 1;
      snake[0].dotDirection = "right";
       this.setState({
          snake: snake
       });
       this.overlapDots();
    }
  }

overlapDots() {
  const snake = this.state.snake;
  const left = snake[0].left;
  const top = snake[0].top;
  const snakePos = [left, top];
  const dots = this.state.dots;
  this.leftDot = this.state.dots.map((dot, index) => {
    const dotPos = [dot.left, dot.top];
    console.log("snake: ", left);
    console.log("dot: ", dot.left);
    if(this.between(left - dot.left, -5, 5) && this.between(top - dot.top, -5, 5)){
      console.log('hit', index);
      this.setState({
        hitDot: true
      });
      return true;
    }
  });
  if(this.state.hitDot){
    this.addDot();
    this.randomDots();
    this.statePosition();
    this.randomDotsMap();
    this.setState({
      hitDot: false,
      dotCount: this.state.dotCount + 1
    });
  }
}

  between(x, min, max) {
    return x>= min && x<= max;
  }

  randomDotsMap() {
    //Map for random dots
    this.ranDots = this.state.dots.map((dot, index) => {
      this.index = index;
      return <Dot 
              id={"index" + dot.index}
              className={dot.animation}
              left={dot.left}
              top={dot.top}
              color={"#" + dot.color}
              />
    });
  }

  getSnakeMovePrevious(x) {
  }

  statePosition() {
    const vart = this.state.dots.map((dot, index) => {
      const left = Math.floor(Math.random() * this.rightBoundary);
      const top = Math.floor(Math.random() * this.bottomBoundary);
      const color = Math.floor(Math.random()*16777215).toString(16);
      return {
        animation: dot.animation,
        index: index,
        left: left,
        top: top,
        color: color
      }
    });
    this.setState({
      dots: vart
    });

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
    clearInterval(this.interval);
    this.setState({
      dotDirection: "up"
    });
    this.interval = setInterval(this.moveHead, 100);
  }

  changeDown() {
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
