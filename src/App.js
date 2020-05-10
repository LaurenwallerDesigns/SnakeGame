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
      changeDirection: [],
      color: "#000000",
      //TITLE BAR STATE
      livesCount: 3,
      level: 1,
      position: [],
      dotCount: 1,
      levelUpGoal: 10,
      hitBoundary: false,
      dotDirection: "down",
      pauseGame: false,
      randomDotsCount: 0,
      snakeCount: 0

    };
    this.startGame = this.startGame.bind(this);
    this.addDot = this.addDot.bind(this);
    this.randomDots = this.randomDots.bind(this);
    this.randomDotsMap = this.randomDotsMap.bind(this);
    this.boundaries = this.boundaries.bind(this);
    this.movingDot = this.movingDot.bind(this);
    this.changeLeft = this.changeLeft.bind(this);
    this.changeRight = this.changeRight.bind(this);
    this.changeUp = this.changeUp.bind(this);
    this.changeDown = this.changeDown.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.overlapDots = this.overlapDots.bind(this);
    this.statePosition = this.statePosition.bind(this);
    this.between = this.between.bind(this);
    this.getSnakeMovePrevious = this.getSnakeMovePrevious.bind(this);
    this.changePositionOfSnake = this.changePositionOfSnake.bind(this);
    this.snakeEffect = this.snakeEffect.bind(this);
  }

  componentDidMount() {
    this.addDot();
    this.randomDots();
    this.boundaries();
    window.addEventListener('keydown', this.movingDot);
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
      const changePos = snake[snakeCurrIndex].changePos;
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
                    dotDirection: direction,
                    changePos: changePos
              }]),
              hitDot: false
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
                    dotDirection: direction,
                    changePos: changePos
              }]),
              hitDot: false
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
                    dotDirection: direction,
                    changePos: changePos
              }]),
              hitDot: false
            }); 
      }else if(direction === "up"){
        this.leftAddedPos = snake[snakeCurrIndex].left;
        this.topAddedPos = snake[snakeCurrIndex].top + 15;
        this.setState({
              snake: this.state.snake.concat([{
                    id: this.prevDotId += 1,
                    animation: false,
                    left: this.leftAddedPos,
                    top: this.topAddedPos,
                    color: this.state.color,
                    dotDirection: direction,
                    changePos: changePos
              }]),
              hitDot: false
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
              dotDirection: "down",
              changePos: 0
        }]),
      });
    } 
  }

//Getting number of random dots
  randomDots() {
    this.ranNum = Math.floor(Math.random() * 50) + 20;
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
    this.startInterval = setInterval(this.changePositionOfSnake, 100);
  }


overlapDots() {
  const snake = this.state.snake;
  const left = snake[0].left;
  const top = snake[0].top;
  const snakePos = [left, top];
  const dots = this.state.dots;
  this.leftDot = this.state.dots.map((dot, index) => {
    const dotPos = [dot.left, dot.top];
    if(this.between(left - dot.left, -5, 5) && this.between(top - dot.top, -5, 5)){
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

  snakeEffect(i, d) {
    if(i > 0 && (this.state.changeDirection.length - 1) > 0){
      console.log(i);
      const snake = this.state.snake.slice();
      const left = snake[i].left;
      const top = snake[i].top;
      const count = snake[i - 1].changePos - 1;
      const cd = this.state.changeDirection.slice();
      const cdLeft = cd[count].left;
      const cdTop = cd[count].top;
      const cdDirection = cd[count].direction;
      const updateCount = snake[i].changePos + 1;
      console.log('prevSegCount:',count);
      console.log('cdLeft:', cdLeft);
      console.log('cdTop:', cdTop);
      console.log('cdDirection:', cdDirection);
      console.log('segLeft:', left);
      console.log('segTop:', top);
      if(left === cdLeft && top === cdTop){
        console.log('hit if');
          return {d: cdDirection, count: updateCount, left: left, top: top, move: 1};
            
      }else{
        const currCount = this.state.snake[i].changePos;
        const top = this.state.snake[i].top;
        const left = this.state.snake[i].left;
          return {d: d, count: currCount, top: top, left: left, move: 1};
      }
    }else {
      const currCount = this.state.snake[i].changePos;
      const top = this.state.snake[i].top;
      const left = this.state.snake[i].left;
        return {d: d, count: currCount, left: left, top: top, move: 1};
    }

  }

  getSnakeMovePrevious(i, left, top, d) {
    this.randomDotsMap();
      const snake = this.state.snake.slice();
      console.log(d);
      const sEffect = this.snakeEffect(i, d);
      console.log(sEffect.d);
      if(sEffect.d === "down"){
        const snakeEffect = this.snakeEffect(i, d);
          snake[i].dotDirection = snakeEffect.d;
          snake[i].changePos = snakeEffect.count;
          snake[i].left = snakeEffect.left;
          snake[i].top = snakeEffect.top + snakeEffect.move;
        this.setState({
          snake:snake
        });
        this.overlapDots();
      }else if(sEffect.d === "up"){
        const snake = this.state.snake.slice();
        const snakeEffect = this.snakeEffect(i, d);
          snake[i].dotDirection = snakeEffect.d;
          snake[i].changePos = snakeEffect.count;
          snake[i].left = snakeEffect.left;
          snake[i].top = snakeEffect.top - snakeEffect.move;
         this.setState({
            snake: snake
         });
         this.overlapDots();
      }else if(sEffect.d === "left"){
        const snake = this.state.snake.slice();
        const snakeEffect = this.snakeEffect(i, d);
          snake[i].dotDirection = snakeEffect.d;
          snake[i].changePos = snakeEffect.count;
          snake[i].left = snakeEffect.left - snakeEffect.move;
          snake[i].top = snakeEffect.top;
        this.setState({
            snake: snake
        });
        this.overlapDots();
      }else if(sEffect.d === "right"){
        const snake = this.state.snake.slice();
        const snakeEffect = this.snakeEffect(i, d);
          snake[i].dotDirection = snakeEffect.d;
          snake[i].changePos = snakeEffect.count;
          snake[i].left = snakeEffect.left + snakeEffect.move;
          snake[i].top = snakeEffect.top;
        this.setState({
          snake: snake
        });
        this.overlapDots();
      }
  }

  changePositionOfSnake() {
    const newSnakeArray = this.state.snake.map((seg, index) => {
      const left = seg.left;
      const top = seg.top;
      const direction = seg.dotDirection;
      this.direction = seg.dotDirection;
      this.getSnakeMovePrevious(index, left, top, direction);
            return direction;
    });
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
    const snake = this.state.snake.slice();
    if(snake[0].dotDirection === "right"){
      this.changeDown();
    }else {
      const hLeft = snake[0].left;
      const hTop = snake[0].top;
      snake[0].dotDirection = "left";
      const currPos = snake[0].changePos;
      snake[0].changePos = currPos + 1;
      this.setState({
        snake: snake,
        changeDirection: this.state.changeDirection.concat([{
          left: hLeft,
          top: hTop,
          direction: "left"
        }]),
      });
          this.interval = setInterval(this.changePositionOfSnake, 100);
    }
  }

  changeRight() {
    clearInterval(this.interval);
    const snake = this.state.snake.slice();
    if(snake[0].dotDirection === "left"){
      this.changeUp();
    }else {
      const hLeft = snake[0].left;
      const hTop = snake[0].top;
      const currPos = snake[0].changePos;
      snake[0].changePos = currPos + 1;
      snake[0].dotDirection = "right";

      this.setState({
        snake: snake,
        changeDirection: this.state.changeDirection.concat([{
          left: hLeft,
          top: hTop,
          direction: "right"
        }]),
      });
    }
    this.interval = setInterval(this.changePositionOfSnake, 100);
  }

  changeUp() {
    clearInterval(this.interval);
    const snake = this.state.snake.slice();
    if(snake[0].dotDirection === "down"){
      this.changeLeft();
    }else {
      const hLeft = snake[0].left;
      const hTop = snake[0].top;
      const currPos = snake[0].changePos;
      snake[0].changePos = currPos + 1;
      snake[0].dotDirection = "up";
      this.setState({
        snake: snake,
        changeDirection: this.state.changeDirection.concat([{
            left: hLeft,
            top: hTop,
            direction: "up"
          }]),
      });
    }
    this.interval = setInterval(this.changePositionOfSnake, 100);
  }

  changeDown() {
    clearInterval(this.interval);
    const snake = this.state.snake.slice();
    if(snake[0].dotDirection === "up"){
      this.changeRight();
    }else {
      const hLeft = snake[0].left;
      const hTop = snake[0].top;
      const currPos = snake[0].changePos;
      snake[0].changePos = currPos + 1;
      snake[0].dotDirection = "down";
      this.setState({
        snake: snake,
        changeDirection: this.state.changeDirection.concat([{
            left: hLeft,
            top: hTop,
            direction: "down"
          }]),
      });
    }
    this.interval = setInterval(this.changePositionOfSnake, 100);
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
      clearInterval(this.startInterval);
        this.changeLeft();
      break;

      //right arrow
      case 39:
      clearInterval(this.startInterval);
      this.changeRight();
      break;

      //up arrow
      case 38:
      clearInterval(this.startInterval);
      this.changeUp();
      break;

      //down arrow
      case 40:
      clearInterval(this.startInterval);
      this.changeDown();
      break;

      case 13:
      clearInterval(this.interval);

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
