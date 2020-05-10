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

//**************************RANDOM DOTS RENDER FUNCTIONS************************************

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


//Getting number of random dots number and sets it to the array
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

// this function is for the random dots. It takes the dots array and maps over them
// to give them a random left, top and color. then sets it to state.

  statePosition() {
    const vart = this.state.dots.map((dot, index) => {
      const left = Math.floor(Math.random() * this.rightBoundary);
      const top = Math.floor(Math.random() * this.bottomBoundary);
      const color = Math.floor(Math.random()*16777215).toString(16);
      console.log(this.rightBoundary)
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



//**************************MOVING SNAKE FUNCTIONS************************************


//This function is run in the getSnakeMovePrevious,
//It takes the index and direction from there. 
//if the index of dot being checked is 0 then it won't run.
//Also, if the dots have never changed position it won't run.
// and it will return the current direction of segment and the current count of Pos
//If true, then we get the changePos number from the previous segment &
//use that number to get the correct index of the changeDirection state.
//It will be tracking the position of the snake[i] and comparing it to
// the changeDirection[count].
// if left and top position are the same then it will return the changedDirection, 
//update the snake[i].changePos
//If it does not equal the changeDirection[count] then it returns the org direction
// and current state of snake[i].changePos. 
  snakeEffect(i, d) {
    if(i > 0 && (this.state.changeDirection.length - 1) >= 0){
      const snake = this.state.snake.slice();
      const left = snake[i].left;
      const top = snake[i].top;
      const count = snake[i - 1].changePos;
      const currCount = snake[i].changePos;
      const subCounts = count - currCount;
      const useCount = subCounts > 1 ? snake[i - 1].changePos - (subCounts) : count - 1;
      const cd = this.state.changeDirection.slice();
      const cdLeft = cd[useCount].left;
      const cdTop = cd[useCount].top;
      const cdDirection = cd[useCount].direction;
      if(left === cdLeft && top === cdTop){
        const upDateCount = snake[i - 1].changePos;
        console.log('ran');
        console.log('index:', i);
        console.log('left:', left);
        console.log('top:', top);
        console.log('cdLeft:', cdLeft);
        console.log('cdTop:', cdTop);
        console.log('upDateCount:', upDateCount);
          return {d: cdDirection, count: upDateCount, left: left, top: top, move: 1};
            
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


//function is set on interval in the change direction function,
//It takes parameters from the changePositionOfSnake ()
//i = index, left = leftPositionofi, top = topPositionOfi, d= dotDirection of i,
//sEffect.d = the direction of snake[i], even before it is changed on state.
// needed to do this because the state was not changing in time for the dots to continue
// to move in the right way.
//When it runs the dots map will render the dots onto page
//Then it runs the snakeEffect which uses the index and direction of each segment
//Using the direction it will determine when the dot is to move
//Then it calls overlapDots to check if the head dot is overlapping a random dot 
//Lastly, we set the new state of the snake
  getSnakeMovePrevious(i, left, top, d) {
    this.randomDotsMap();
      const snake = this.state.snake.slice();
      const snakeEffect = this.snakeEffect(i, d);
      if(snakeEffect.d === "down"){
          snake[i].dotDirection = snakeEffect.d;
          snake[i].changePos = snakeEffect.count;
          snake[i].left = snakeEffect.left;
          snake[i].top = snakeEffect.top + snakeEffect.move;
        this.setState({
          snake:snake
        });
        this.overlapDots();
      }else if(snakeEffect.d === "up"){
        const snake = this.state.snake.slice();
          snake[i].dotDirection = snakeEffect.d;
          snake[i].changePos = snakeEffect.count;
          snake[i].left = snakeEffect.left;
          snake[i].top = snakeEffect.top - snakeEffect.move;
         this.setState({
            snake: snake
         });
         this.overlapDots();
      }else if(snakeEffect.d === "left"){
        const snake = this.state.snake.slice();
          snake[i].dotDirection = snakeEffect.d;
          snake[i].changePos = snakeEffect.count;
          snake[i].left = snakeEffect.left - snakeEffect.move;
          snake[i].top = snakeEffect.top;
        this.setState({
            snake: snake
        });
        this.overlapDots();
      }else if(snakeEffect.d === "right"){
        const snake = this.state.snake.slice();
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

//this function is the interval that is continuiously running. 
//it maps over the snake array and sends the infomation to the getSnakeMovePrevious

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

//This function is triggered when the left arrow is pressed.
//it clears previous interval, then checks if the dotDirection is 'right'
//if true then changes to this.changeDown().
//if false, then sets the snake[0].left, top and direction to a new array concated
//onto the changeDirection key. Changes the dotDirection of the headSnake. 
// setState and restarts interval.
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

//This function is triggered when the right arrow is pressed.
//it clears previous interval, then checks if the dotDirection is 'left'
//if true then changes to this.changeUp().
//if false, then sets the snake[0].left, top and direction to a new array concated
//onto the changeDirection key. Changes the dotDirection of the headSnake. 
// setState and restarts interval.

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

//This function is triggered when the up arrow is pressed.
//it clears previous interval, then checks if the dotDirection is 'down'
//if true then changes to this.changeLeft().
//if false, then sets the snake[0].left, top and direction to a new array concated
//onto the changeDirection key. Changes the dotDirection of the headSnake. 
// setState and restarts interval.

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

//This function is triggered when the down arrow is pressed.
//it clears previous interval, then checks if the dotDirection is 'up'
//if true then changes to this.changeRight().
//if false, then sets the snake[0].left, top and direction to a new array concated
//onto the changeDirection key. Changes the dotDirection of the headSnake. 
// setState and restarts interval.
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

  pauseGame(key) {
    this.setState({
      pauseGame: !this.state.pauseGame
    });

    if(this.state.pauseGame === true){
      clearInterval(this.interval);
    }else{
      this.interval = setInterval(this.changePositionOfSnake, 100);
    }
  }

  movingDot(evt) {
    switch (evt.keyCode) {
      //left arrow
      case 37: 
      clearInterval(this.startInterval);
      console.log(evt.keyCode);
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
      //
      clearInterval(this.startInterval);
      this.pauseGame(evt.keyCode);
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
