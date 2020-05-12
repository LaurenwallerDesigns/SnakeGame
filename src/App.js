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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GAME START STATE
      width: 0,
      height: 0,
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
      levelType: "easy",
      position: [],
      dotCount: 1,
      speed: 100,
      levelUpGoal: 5,
      hitBoundary: false,
      dotDirection: "down",
      pauseGame: false,
      randomDotsCount: 0,
      snakeCount: 0,
      closeCall: false

    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
    this.renderLevel = this.renderLevel.bind(this);
    this.levelUpCheck = this.levelUpCheck.bind(this);
    this.subALife = this.subALife.bind(this);
    this.endOfGame = this.endOfGame.bind(this);
    this.barriers = this.barriers.bind(this);
    this.probablity = this.probablity.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    this.addDot();
    this.barriers();
    this.randomDots();
    window.addEventListener('keydown', this.movingDot);
    window.addEventListener('resize', this.updateWindowDimensions);
  }

//Changes state of width/height on screen resizes
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight});
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
      const posIndex = snake[snakeCurrIndex].positionIndex - 1;
      if(direction === "down"){
        this.leftAddedPos = snake[0].position[posIndex].left;
        this.topAddedPos = snake[0].position[posIndex].top;
        this.setState({
              snake: this.state.snake.concat([{
                    id: this.prevDotId += 1,
                    animation: false,
                    left: this.leftAddedPos,
                    top: this.topAddedPos,
                    color: this.state.color,
                    dotDirection: direction,
                    positionIndex: posIndex
              }]),
              hitDot: false
            });
      }else if(direction === "left"){
        this.leftAddedPos = snake[0].position[posIndex].left;
        this.topAddedPos = snake[0].position[posIndex].top;
        this.setState({
              snake: this.state.snake.concat([{
                    id: this.prevDotId += 1,
                    animation: false,
                    left: this.leftAddedPos,
                    top: this.topAddedPos,
                    color: this.state.color,
                    dotDirection: direction,
                    positionIndex: posIndex
              }]),
              hitDot: false
            });        
      }else if(direction === "right"){
        this.leftAddedPos = snake[0].position[posIndex].left;
        this.topAddedPos = snake[0].position[posIndex].top;
        this.setState({
              snake: this.state.snake.concat([{
                    id: this.prevDotId += 1,
                    animation: false,
                    left: this.leftAddedPos,
                    top: this.topAddedPos,
                    color: this.state.color,
                    dotDirection: direction,
                    positionIndex: posIndex
              }]),
              hitDot: false
            }); 
      }else if(direction === "up"){
        this.leftAddedPos = snake[0].position[posIndex].left;
        this.topAddedPos = snake[0].position[posIndex].top;
        this.setState({
              snake: this.state.snake.concat([{
                    id: this.prevDotId += 1,
                    animation: false,
                    left: this.leftAddedPos,
                    top: this.topAddedPos,
                    color: this.state.color,
                    dotDirection: direction,
                    positionIndex: posIndex
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
              position:[{
                left: window.innerWidth * 0.5,
                top: window.innerHeight * 0.5,
                direction: 'down'
              }],
              positionIndex: 0
        }]),
      });
    } 
  }

  barriers() {
    if(this.state.levelType === 'easy'){
      this.width = (window.innerWidth) - (window.innerWidth * 0.1);
      this.height = (window.innerHeight * 0.8);
      this.quantityOfDots = 25;
    } else if(this.state.levelType === 'medium'){
      this.width = (window.innerWidth * 0.8) - (window.innerWidth * 0.2);
      this.height = (window.innerHeight * 0.75);
      this.quantityOfDots = 15;
    } else if(this.state.levelType === 'hard'){
      this.width = (window.innerWidth * 0.7) - (window.innerWidth * 0.25);
      this.height = (window.innerHeight * 0.7);
      this.quantityOfDots = 10;
    } else if(this.state.levelType === 'superHard'){
      this.width = (window.innerWidth * 0.7) - (window.innerWidth * 0.3);
      this.height = (window.innerHeight * 0.65);
      this.quantityOfDots = 8;
    } else if(this.state.levelType === 'extreme'){
      this.width = (window.innerWidth * 0.5) - (window.innerWidth * 0.2);
      this.height = (window.innerHeight * 0.6);
      this.quantityOfDots = 4;
    }
  }

//Boundaries for the screen
  boundaries(i) {
    const snake = this.state.snake;
    const left = snake[0].left;
    const top = snake[0].top;
    if(this.between(left, 1, 30) || this.between(left, this.width - 30, this.width - 1) || this.between(top, 1, 30) || this.between(top, this.height - 30, this.height - 1)){
      this.setState({
        closeCall: true
      });
    }else if(left <= 0 || left >= this.width || top <= 0 || top >= this.height){
        this.setState({
          hitBoundary: true,
          livesCount: this.state.livesCount - 1
        });
        this.pauseGame();
        this.changePositionOfSnake();
        const direction = this.state.snake[0].dotDirection;
        if(this.state.livesCount > 0){
          this.subALife();
        }else{
          this.setState({
            color: "#C9172B",
            gameOver: true
          });
          setTimeout(this.endOfGame, 2000);
        }
      }else {
      this.setState({
        closeCall: false
      });
    }
  }

  subALife(i) {
    this.setState({
      hitBoundary: false
    });

    this.pauseGame();
    
  }

  endOfGame() {
    const snake = this.state.snake[0];
    this.setState({
      pauseGame: true,
      game: false,
      level: 1,
      dotCount: 1,
      snake: snake,
      lives: 3,
      speed: 100
    });
  }

//Onclick to start game
  startGame() {
    this.setState({
      game: true,
      gameOver: false
    });
    this.statePosition();
    this.startInterval = setInterval(this.changePositionOfSnake, this.state.speed);
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
    this.levelUpCheck();
  }
}

  between(x, min, max) {
    return x>= min && x<= max;
  }


  //LEVEL UP METHODS

  levelUpCheck() {
    if(this.state.dotCount === this.state.levelUpGoal){
      clearInterval(this.startInterval);
      this.probablity();
      const newLevel = this.state.level + 1;
      const newGoal = this.state.levelUpGoal * newLevel;
      this.setState({
        pauseGame: true,
        level: newLevel,
        levelUpGoal: newGoal,
        speed: this.state.speed - 10,
        madeGoal: true
      });
      this.barriers();
      this.randomDots();
      this.statePosition();
      setTimeout(this.renderLevel.bind(newLevel), 2000);
      console.log(this.state.levelType);
    }
  }

  renderLevel(num){
    this.pauseGame();
    this.setState({
      madeGoal: false
      });
  }

  probablity() {
    if(this.state.level < 1){
      this.setState({
        levelType: 'easy'
      });
    }else if(this.state.level > 1 && this.state.level < 20){
      const num = Math.floor(Math.random() * 50);
      if(num < 30 && num % 2 == 0){
        this.setState({
        levelType: 'easy'
        });
      }else if(num < 30){
        this.setState({
          levelType: 'medium'
        });
      }else if(num > 30 && num % 2 == 0) {
        this.setState({
          levelType: 'hard'
        });
      }else if(num > 30){
        this.setState({
          levelType: 'easy'
        });
      }else if(num > 40 && num % 2 == 0){
        this.setState({
          levelType: 'superHard'
        });
      }else if(num > 48){
        this.setState({
          levelType: 'extreme'
        });
      }else {
        this.setState({
          levelType: 'easy'
        });
      }
    }
  }



//**************************RANDOM DOTS RENDER FUNCTIONS************************************

  randomDotsMap() {
    //Map for random dots
    this.ranDots = this.state.dots.map((dot, index) => {
      this.index = index;
      return <Dot 
              id={"index" + dot.index}
              className={dot.animation}
              ranDot={true}
              left={dot.left}
              top={dot.top}
              color={"#" + dot.color}
              />
    });
  }


//Getting number of random dots number and sets it to the array
  randomDots() {
    this.ranNum = Math.floor(Math.random() * 50) + this.quantityOfDots;
    this.leftPos = Math.floor(Math.random() * Math.floor(this.width));
    this.topPos = Math.floor(Math.random() * Math.floor(this.height));
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
    const topBoundary = 5;
    const num = window.innerWidth - this.width;
    const rightBoundary = window.innerWidth - num;
    const leftBoundary = (window.innerWidth - this.width) / 2;
    const bottomBoundary = this.height - 10;
    const vart = this.state.dots.map((dot, index) => {
      const left = Math.floor(Math.random() * (rightBoundary - leftBoundary)) + leftBoundary;
      const top = Math.floor(Math.random() * Math.floor(bottomBoundary - topBoundary)) + topBoundary;
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
    const snake = this.state.snake.slice();
    if(snake[0].dotDirection === "down"){
      const left = snake[0].left;
      const top = snake[0].top + 1;
      const direction = snake[0].dotDirection;

      
      const position = {left: left,
            top: top,
            direction: direction};

      return position;

    }else if(snake[0].dotDirection === "up"){
      const left = snake[0].left;
      const top = snake[0].top - 1;
      const direction = snake[0].dotDirection;
      const position = {left: left,
            top: top,
            direction: direction};

      return position;
    }else if(snake[0].dotDirection === "left"){
      const left = snake[0].left - 1;
      const top = snake[0].top;
      const direction = snake[0].dotDirection;

      
      const position = {left: left,
            top: top,
            direction: direction};
      return position;
    }else if(snake[0].dotDirection === "right"){
      const left = snake[0].left + 1;
      const top = snake[0].top;
      const direction = snake[0].dotDirection;

      
      const position = {left: left,
            top: top,
            direction: direction};
      return position;
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
  getSnakeMovePrevious(i) {
    this.randomDotsMap();
      const snake = this.state.snake.slice();
      const snakeEffect = this.snakeEffect();
        const snakePositionIndex = snake[i].positionIndex;
        console.log(snakePositionIndex);
          snake[i].dotDirection = snake[0].position[snakePositionIndex].direction;
          snake[i].left = snake[0].position[snakePositionIndex].left;
          snake[i].top = snake[0].position[snakePositionIndex].top;
          snake[0].position.concat([{
            snakeEffect
          }]);
          snake[i].positionIndex = snakePositionIndex + 1;


        this.setState({
          snake: snake
        });
        this.overlapDots();
        this.boundaries();
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
    const snake = this.state.snake.slice();
    if(snake[0].dotDirection === "right"){
      this.changeDown();
    }else {
      snake[0].dotDirection = "left";
      this.setState({
        snake: snake
      });
      //this.interval = setInterval(this.changePositionOfSnake, 100);
    }
  }

//This function is triggered when the right arrow is pressed.
//it clears previous interval, then checks if the dotDirection is 'left'
//if true then changes to this.changeUp().
//if false, then sets the snake[0].left, top and direction to a new array concated
//onto the changeDirection key. Changes the dotDirection of the headSnake. 
// setState and restarts interval.

  changeRight() {
    const snake = this.state.snake.slice();
    if(snake[0].dotDirection === "left"){
      this.changeUp();
    }else {
      snake[0].dotDirection = "right";

      this.setState({
        snake: snake
      });
    }
    //this.interval = setInterval(this.changePositionOfSnake, 100);
  }

//This function is triggered when the up arrow is pressed.
//it clears previous interval, then checks if the dotDirection is 'down'
//if true then changes to this.changeLeft().
//if false, then sets the snake[0].left, top and direction to a new array concated
//onto the changeDirection key. Changes the dotDirection of the headSnake. 
// setState and restarts interval.

  changeUp() {
    const snake = this.state.snake.slice();
    if(snake[0].dotDirection === "down"){
      this.changeLeft();
    }else {
      snake[0].dotDirection = "up";
      this.setState({
        snake: snake
      });
    }
    //this.interval = setInterval(this.changePositionOfSnake, 100);
  }

//This function is triggered when the down arrow is pressed.
//it clears previous interval, then checks if the dotDirection is 'up'
//if true then changes to this.changeRight().
//if false, then sets the snake[0].left, top and direction to a new array concated
//onto the changeDirection key. Changes the dotDirection of the headSnake. 
// setState and restarts interval.
  changeDown() {
    //clearInterval(this.interval);
    const snake = this.state.snake.slice();
    if(snake[0].dotDirection === "up"){
      this.changeRight();
    }else {
      snake[0].dotDirection = "down";
      this.setState({
        snake: snake
      });
    }
    //this.interval = setInterval(this.changePositionOfSnake, 100);
  }

  pauseGame(key) {
    this.setState({
      pauseGame: !this.state.pauseGame
    });

    if(this.state.pauseGame){
      clearInterval(this.startInterval);
    }else{
      this.startInterval = setInterval(this.changePositionOfSnake, this.state.speed);
    }
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
    const madeGoal = <GoalMade 
                      level={this.state.level}
                      />
    const loseLife = <LoseLife />
    // if(this.state.pauseGame){
    //   var pause = <PauseDisplay />;
    // }else{
    //   var pause = null;
    // }

    return (
      <div style={{height: window.innerHeight, width: window.innerWidth}}>
        {this.state.game ?
          ( <React.Fragment>
              <TitleBar
                livesCount={this.state.livesCount}
                level={this.state.level}
                dotCount={this.state.dotCount}
                levelUpGoal={this.state.levelUpGoal} />
                {this.state.madeGoal ? madeGoal : ''}
                {this.state.hitBoundary ? loseLife : ''}
              <div id="game-board" className={this.state.closeCall ? 'redBorder' : ''} style={{height: this.height + 'px', width: this.width + 'px'}} >
                <div id="snake">
                  {snake}
                </div>
                <div id="ranDots">
                    {this.ranDots}
                </div>
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
