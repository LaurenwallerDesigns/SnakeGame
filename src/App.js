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
import NoBoundaries from './components/NoBoundaries';
import GainALife from './components/GainALife';

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
      backgroundColor: "#ffffff",
      boundaries: true,
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
      closeCall: false,
      icons: [],
      iconProb: 4

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
    this.randomIcons = this.randomIcons.bind(this);
    this.boundaryChangePoints = this.boundaryChangePoints.bind(this);
    this.renderIcons = this.renderIcons.bind(this);
    this.undoPower = this.undoPower.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    this.addDot();
    this.barriers();
    this.randomDots();
    this.randomIcons(this.state.iconProb);
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
              changePos: -1
        }]),
      });
    } 
  }

  barriers() {
      this.width = (window.innerWidth) - (window.innerWidth * 0.1);
      this.height = (window.innerHeight * 0.8);
    if(this.state.levelType === 'easy'){
      this.quantityOfDots = 25;
    } else if(this.state.levelType === 'medium'){
      this.quantityOfDots = 15;
    } else if(this.state.levelType === 'hard'){
      this.quantityOfDots = 10;
    } else if(this.state.levelType === 'superHard'){
      this.quantityOfDots = 8;
    } else if(this.state.levelType === 'extreme'){
      this.quantityOfDots = 4;
    }
  }

//Boundaries for the screen
  boundaries(i) {
    const snake = this.state.snake;
    const left = snake[0].left;
    const top = snake[0].top;
  if(this.state.boundaries === "disabled"){
    if(left <= 5 || left >= this.width -5 || top <= 5 || top >= this.height + 5){
      const d = snake[0].dotDirection;
      if(d === "down"){
        this.changeLeft();
      }else if(d === "up"){
        this.changeRight();
      }else if(d === "right"){
        this.changeDown();
      }else if(d === "left"){
        this.changeUp();
      }
    }
  }else{
      if(this.between(left, 1, 30) || this.between(left, this.width - 30, this.width - 1) || this.between(top, 1, 30) || this.between(top, this.height - 30, this.height - 1)){
        this.setState({
          closeCall: true
        });
      }else if(left <= 0 || left >= this.width || top <= 0 || top >= this.height){
          this.setState({
            hitBoundary: true,
            livesCount: this.state.livesCount - 1,
            pauseGame: true
          });
          this.boundaryChangePoints();
          //calling to pause game
          this.changePositionOfSnake();
          const direction = this.state.snake[0].dotDirection;
          if(this.state.livesCount > 0){
            this.setState({
              hitBoundary: false,
              loseLife: true
            });
            setTimeout(this.subALife, 1000);
          }else{
            this.setState({
              hitBoundary: false,
              gameOver: true,
              pauseGame: true
            });
            //calling to pause timeout
            this.changePositionOfSnake();
            setTimeout(this.endOfGame, 1000);
          }
        }else {
        this.setState({
          closeCall: false
        });
      }
    }
  }

  subALife(i) {
    this.setState({
      loseLife: false,
      pauseGame: false
    });
    //calling to restart timeout
    this.changePositionOfSnake();
    
  }

  endOfGame() {
    const snake = this.state.snake[0];
    this.setState({
      game: false
    });
    window.location.reload();
  }

//Onclick to start game
  startGame() {
    this.setState({
      game: true,
      gameOver: false
    });
    this.statePosition();
    this.iconPosition();
    //calling to start timeout
    this.changePositionOfSnake();
  }

overlapIcons() {
  const snake = this.state.snake;
  const left = snake[0].left;
  const top = snake[0].top;
  this.iconHit = this.state.icons.map((i, index) => {
    if(this.between(left - i.left, -5, 5) && this.between(top - i.top, -40, 40)){
      this.setState({
        hitIcon: true
      });
        this.type = i.type;
        return this.type;
      }
    });
    if(this.state.hitIcon){
      this.iconPower(this.type);
      this.randomIcons(0);
      this.iconPosition();
  }

}


overlapDots() {
  const snake = this.state.snake;
  const left = snake[0].left;
  const top = snake[0].top;
  const dots = this.state.dots;
  this.leftDot = dots.map((dot, index) => {
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
      this.probablity();
      const newLevel = this.state.level + 1;
      const newGoal = newLevel * newLevel + 10;
      const speed = this.state.speed - 10 === this.maxspeed ? this.maxspeed : this.state.speed - 10;
      this.setState({
        level: newLevel,
        levelUpGoal: newGoal,
        speed: speed,
        madeGoal: true,
        pauseGame: true
      });
      //calling to clear timeout
      this.changePositionOfSnake();
      this.barriers();
      this.randomDots();
      this.statePosition();
      this.randomIcons(this.state.iconProb);
      this.renderTimeOut = setTimeout(this.renderLevel.bind(newLevel), 2000);
    }
  }

  renderLevel(num){
    this.iconPosition();
    this.setState({
      madeGoal: false,
      pauseGame: false
      });
    //calling to restart timeout
    this.changePositionOfSnake();
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
          iconProb: 2,
          levelType: 'easy'
        });
      }else if(num < 30){
        this.setState({
          iconProb: 3, 
          levelType: 'medium'
        });
      }else if(num > 30 && num % 2 == 0) {
        this.setState({
          iconProb: 5,
          levelType: 'hard'
        });
      }else if(num > 30){
        this.setState({
          iconProb: 5,
          levelType: 'easy'
        });
      }else if(num > 40 && num % 2 == 0){
        this.setState({
          iconProb: 5,
          levelType: 'superHard'
        });
      }else if(num > 48){
        this.setState({
          iconProb: 5,
          levelType: 'extreme'
        });
      }else {
        this.setState({
          iconProb: 2,
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
    const arrayFill = {animation: false,
            left: window.innerWidth * 0.3,
            top: window.innerHeight * 0.3,
            color: this.state.color};
    this.setState({
      dots: Array(this.ranNum).fill(arrayFill)
      });
    this.randomIcons(this.state.iconProb);
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

//**************************ICONS FUNCTIONS************************************

iconPosition() {
  const topBoundary = 105;
  const num = window.innerWidth - this.width;
  const rightBoundary = window.innerWidth - num;
  const leftBoundary = (window.innerWidth - this.width) / 2;
  const bottomBoundary = this.height - 100;
  const easy = ["blackout", "faster"];
  const medium = ["blackout", "faster", "lose", "gain", "faster", "nobounds"];
  const hard = ["blackout", "faster", "lose", "gain", "gain", "nobounds", "lose", "lose", "faster"];
  const superHard = ["blackout", "faster", "gain", "nobounds", "lose", "gain", "lose", "nobounds", "lose", "lose", "faster", "lose", "lose", "bolt", "bolt", "bolt", "lose"];
  const extreme = ["blackout", "faster", "lose", "lose", "bolt", "bolt", "bolt", "lose", "lose", "gain", "lose", "nobounds", "lose", "lose", "faster", "lose", "lose", "bolt", "bolt", "bolt", "lose"];

  this.iconType = this.state.levelType === "easy" ? easy : this.state.levelType === "medium" ? medium : this.state.levelType === "hard" ? hard : this.state.levelType === "superHard" ? superHard : this.state.levelType === "extreme" ? extreme : easy;
  const icon = this.state.icons.map((icon, index) => {
    const left = Math.floor(Math.random() * (rightBoundary - leftBoundary)) + leftBoundary;
    const top = Math.floor(Math.random() * Math.floor(bottomBoundary - topBoundary)) + topBoundary;
    const type = this.iconType[Math.floor(Math.random() * this.iconType.length)];
    return {
      left: left,
      top: top,
      type: type
    }
  });
  this.setState({
    icons: icon,
  });
}
maxspeed = 10;
  iconPower(type){
    if(type === "blackout"){
      this.setState({
        backgroundColor: "#000000",
        color: "#ffffff"
      });
      console.log(type);
      setTimeout(this.undoPower, 5000, type);
    }else if(type === "faster"){
      const speed = this.state.speed - 20 === this.maxspeed ? this.maxspeed : this.state.speed - 20;
        this.setState({
          prevSpeed: this.state.speed,
          speed: speed
        });
      setTimeout(this.undoPower, 3000, type);
    }else if(type === "lose"){
      this.setState({
        livesCount: this.state.livesCount - 1,
        loseLife: true,
        pauseGame: true,
        hitIcon: false
      });
      if(this.state.livesCount > 0){
        setTimeout(this.subALife, 1000);
      }else{
        setTimeout(this.endOfGame, 500);
      }
    }else if(type === "gain"){
      this.setState({
        livesCount: this.state.livesCount + 1,
        hitIcon: false
      });
    }else if(type === "bolt"){
      this.setState({
        prevSpeed: this.state.speed,
        speed: this.maxspeed
      });
      setTimeout(this.undoPower, 3000, type);
    }else if(type === "nobounds"){
      this.setState({
        boundaries: "disabled"
      })
      setTimeout(this.undoPower, 5000, type);
    }
  }

  undoPower(type){
    console.log('ran', type);
    if(type === "blackout"){
      console.log('ran blackout');
      this.setState({
        backgroundColor: "#ffffff",
        color: "#000000",
        hitIcon: false
      });
    }else if(type === "faster"){
      this.setState({
        speed: this.state.prevSpeed,
        hitIcon: false
      });
    }else if(type === "bolt"){
      this.setState({
        speed: this.state.prevSpeed,
        hitIcon: false
      })
    }else if(type === "nobounds"){
      this.setState({
        boundaries: true,
        hitIcon: false
      });
    }
  }

//Getting number of random icon numbers
  randomIcons(x) {
    const iconRandom = Math.floor(Math.random() * x);
    const arrayFill = {
            left: window.innerWidth * 0.4,
            top: window.innerHeight * 0.4,
            type: ""};
    this.setState({
      icons: Array(iconRandom).fill(arrayFill)
    });
  }

  renderIcons() {
    if(this.state.icons.length > 0){
      this.iconRender = this.state.icons.map((icon, index) => {
        if(icon.type === "faster"){
          return <SpeedUp 
                  id={"icon" + index}
                  left={icon.left}
                  top={icon.top} />
        }else if (icon.type === "blackout"){
          return <BlackOut
                    id={"icon" + index}
                    left={icon.left}
                    top={icon.top} />
        } else if (icon.type === "lose"){
          return <Bomb 
                    id={"icon" + index}
                    left={icon.left}
                    top={icon.top} />          
        }else if(icon.type === "gain"){
          return <GainALife
                    id={"icon" + index}
                    left={icon.left}
                    top={icon.top} />
        }else if(icon.type === "bolt"){
          return <LightSpeed
                    id={"icon" + index}
                    left={icon.left}
                    top={icon.top} />
        }else if(icon.type === "nobounds"){
          return <NoBoundaries
                    id={"icon" + index}
                    left={icon.left}
                    top={icon.top} />
        }
      })
    }
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
    if(i > 0){
      const iCount = snake[i].changePos;
      const pCount = snake[i - 1].changePos;
      const subCounts = pCount - iCount;
      if(subCounts > 0){
        const left = snake[i].left;
        const top = snake[i].top;
        const currCount = snake[i].changePos + 1;
        const cd = this.state.changeDirection.slice();
        const cdLeft = cd[currCount].left;
        const cdTop = cd[currCount].top;
        const cdDirection = cd[currCount].direction;
        if(left === cdLeft && top === cdTop){
          const upDateCount = currCount;
            return {d: cdDirection, count: upDateCount, left: cdLeft, top: cdTop, move: this.state.hitBoundary ? -250 : 1};
        }else{
          const currCount = this.state.snake[i].changePos;
          const top = this.state.snake[i].top;
          const left = this.state.snake[i].left;
            return {d: d, count: currCount, top: top, left: left, move: this.state.hitBoundary ? -250 : 1};
        }
      }else{
        const currCount = this.state.snake[i].changePos;
        const top = this.state.snake[i].top;
        const left = this.state.snake[i].left;
          return {d: d, count: currCount, top: top, left: left, move: this.state.hitBoundary ? -250 : 1};
      }
    }else {
      const currCount = this.state.snake[i].changePos;
      const top = this.state.snake[i].top;
      const left = this.state.snake[i].left;
        return {d: d, count: currCount, left: left, top: top, move: this.state.hitBoundary ? -250 : 1};
    }
  }
//Called once upon when hitBoundary is true. It changes to changeDirection to the new positions
//so the dots can continue to snake through the directions
  boundaryChangePoints() {
    const snake = this.state.snake.slice();
    const back = snake[snake.length - 1].changePos;
    const head = snake[0].changePos;
    const d = snake[0].dotDirection;
    const move = -250;
    if(head - back > 0){
      const changePostionArray = this.state.changeDirection.map((pos, index) => {
          pos.left = d === 'left' ? pos.left - (move) : d === 'right' ? pos.left + (move) : pos.left;
          pos.top = d === 'down' ? pos.top + (move) : d === 'up' ? pos.top - (move) : pos.top;
          return {
            direction: pos.direction,
            left: pos.left,
            top: pos.top
          }
      });
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
      const snake = this.state.snake.slice();
      const snakeEffect = this.snakeEffect(i, d);

      if(this.state.hitBoundary){
        const hd = snake[0].dotDirection;
        snake[i].dotDirection = snakeEffect.d;
          snake[i].changePos = snakeEffect.count;
          snake[i].left = hd === 'left' ? snakeEffect.left - snakeEffect.move : hd === 'right' ? snakeEffect.left + snakeEffect.move : snakeEffect.left;
          snake[i].top = hd === 'down' ? snakeEffect.top + snakeEffect.move : hd === 'up' ? snakeEffect.top - snakeEffect.move : snakeEffect.top;
          this.setState({
            snake: snake
          });
        this.overlapDots();
        this.overlapIcons();
        this.boundaries(i);
      }else {
          snake[i].dotDirection = snakeEffect.d;
          snake[i].changePos = snakeEffect.count;
          snake[i].left = snakeEffect.d === 'left' ? snakeEffect.left - snakeEffect.move : snakeEffect.d === 'right' ? snakeEffect.left + snakeEffect.move : snakeEffect.left;
          snake[i].top = snakeEffect.d === 'down' ? snakeEffect.top + snakeEffect.move : snakeEffect.d === 'up' ? snakeEffect.top - snakeEffect.move : snakeEffect.top;
        this.setState({
          snake:snake
        });
      
        this.overlapDots();
        this.overlapIcons();
        this.boundaries(i);
      }
  }

//this function is the interval that is continuiously running. 
//it maps over the snake array and sends the infomation to the getSnakeMovePrevious

  changePositionOfSnake() {
        this.randomDotsMap();
        this.renderIcons();
      const newSnakeArray = this.state.snake.map((seg, index) => {
        const left = seg.left;
        const top = seg.top;
        const direction = seg.dotDirection;
        this.direction = seg.dotDirection;
        this.getSnakeMovePrevious(index, left, top, direction);
              return direction;
      });
      if(this.state.pauseGame){
        clearTimeout(this.startTimeout);
      }else {
      this.startTimeout = setTimeout(this.changePositionOfSnake, this.state.speed);
    }
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
    //this.interval = setInterval(this.changePositionOfSnake, 100);
  }

  pauseGame(key) {
    this.setState({
      pauseGame: !this.state.pauseGame
    });

    this.changePositionOfSnake();
  }

  movingDot(evt) {
    switch (evt.keyCode) {
      //left arrow
      case 37: 
        setTimeout(this.changeLeft, this.state.speed);
      break;

      //right arrow
      case 39:
      setTimeout(this.changeRight, this.state.speed);
      break;

      //up arrow
      case 38:
      setTimeout(this.changeUp, this.state.speed);
      break;

      //down arrow
      case 40:
      setTimeout(this.changeDown, this.state.speed);
      break;

      case 13:
      this.pauseGame(evt.keyCode);
      break;
    }
  }

  render() {  
    const halfWidth = window.innerWidth / 2;
    const centerPause = halfWidth - 243.6875;

//Map for collecting dots to the snake
    var snake = this.state.snake.map((dot, index) =>
      <Dot 
        id={index}
        className={dot.animation}
        left={dot.left}
        top={dot.top}
        color={this.state.color}
        />

    );
    const madeGoal = <GoalMade 
                      level={this.state.level}
                      />
    const loseLife = <LoseLife />

    const gameOver = <GameOver />

    const pauseGame = <PauseDisplay
                        center={centerPause} />



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
                {this.state.loseLife ? loseLife : ''}
                {this.state.gameOver ? gameOver : ''}
                {this.state.pauseGame ? pauseGame : ''}
              <div id="game-board" className={this.state.closeCall ? 'redBorder' : ''} style={{height: this.height + 'px', width: this.width + 'px', backgroundColor: this.state.backgroundColor}} >
                <div id="snake">
                  {snake}
                </div>
                <div id="ranDots">
                    {this.ranDots}
                    {this.iconRender}
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
