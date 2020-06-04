import React from 'react';
import './index.css';
// import BreakPoint from './components/BreakPoint';
// import HasError from './components/HasError';
import StartButton from './components/StartButton';
import Dot from './components/dot';
import TitleBar from './components/TitleBar';
import PauseDisplay from './components/PauseDisplay';
import LightSpeed from './components/LightSpeed';
import SpeedUp from './components/SpeedUp';
import Bomb from './components/Bomb';
import NoBoundaries from './components/NoBoundaries';
import GainALife from './components/GainALife';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GAME START STATE
      rows: 25,
      cols: 40,
      grid: [],
      //DOTS RANDOMLY PLACED AROUND
      food: Array(10).fill(null),
      //SNAKE
      snake: {
        head: {},
        tail: []
      },
      hitTail: false,
      currentDirection: 'up',
      activeIcon: false,
      color: "000000",
      //TITLE BAR STATE
      lifeCount: 3,
      hitBoundary: false,
      pauseGame: false,
      closeCall: false,
      followPosition: [],
      game: true,
      icons: [],
      count: 0,
      time: 500,
      activeIconType: false,
      iconProb: 4,
    };
    this.movingDot = this.movingDot.bind(this);
    this.randomFood = this.randomFood.bind(this);
    this.randomIcons = this.randomIcons.bind(this);
    this.renderHead = this.renderHead.bind(this);
    this.gameTick = this.gameTick.bind(this);
  }

  componentDidMount() {
    //Get width of Game-board
    const pixelWidth = window.innerWidth * .99;
    //Get grid width 
    this.gridWidth = Math.floor(pixelWidth) - 20;
    /*gridWidth = numberOfGridCells * widthOfAGridItem;*/
    const cols = Math.floor(this.gridWidth / 20);
    //get height of game-board
    const pixelHeight = window.innerHeight * .80;
    //get grid height
    this.gridHeight = Math.floor(pixelHeight) - 20;
    //get rows
    const rows = Math.floor(this.gridHeight / 20);
    this.setState({
      rows: rows,
      cols: cols
    });
    document.body.addEventListener('keydown', this.movingDot);
    //setting intial state
    this.randomFood();
    this.randomIcons();
    this.setState((state) => {
      const newState = {
        ...state,
        food: this.randomFood(),
        snake: {
          head: this.renderHead(),
          tail: state.snake.tail
        },
        icons: this.randomIcons(),
      };
      const grid = this.renderGrid(newState, true);
      return {
        ...newState,
        grid
      }
    });
    this.renderGrid();
    //interval for snake moving
    this.tickTime = 500;
    window.fnInterval = setInterval(() => {
      this.gameTick();
    }, this.tickTime);
  }


handleonclick() {
  window.location.reload();
}


  renderGrid(state = {}, sendback = false) {
    if(!Object.keys(state).length){
      state = this.state;
    }
    const grid = [];
    const {
      rows,
      cols,
      food,
      snake,
      followPosition,
      icons
    } = state;
    for(let row = 0; row < this.state.rows; row++) {
      for(let col = 0; col < this.state.cols; col++){

        const isHead = (snake.head.row === row && snake.head.col === col);
        let isFood = false;
        let color = false;
        this.food.forEach(f => {
          if(f.row === row && f.col === col){
            isFood = true;
            color = f.color;
          }
        });

        let isTail = false;
        snake.tail.forEach(t => {
          if(t.row === row && t.col === col){
            isTail = true;
          }
        });

        let isIcon = false;
        let type = "none";
        this.icons.forEach(i => {
          if(i.row === row && i.col === col){
            isIcon = true;
            type = i.itype;
          }
        });

        grid.push({
          row,
          col,
          isFood,
          color,
          isHead,
          isTail,
          isIcon,
          type
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

  renderHead() {
    return {
      row: Math.floor((this.state.rows - 1) / 2),
      col: Math.floor((this.state.cols - 1) / 2)
    }
  }

  randomFood() {
    this.food = this.state.food.map((piece, index) => {
      return{
        col: Math.floor((Math.random() * this.state.cols)),
        row: Math.floor((Math.random() * this.state.rows)),
        color: Math.floor(Math.random()*16777215).toString(16)
 
      }
    });
    return this.food
  }

  randomIcons() {
    this.icons = [];
    const randomNumber = Math.floor(Math.random() * 4);
    const type = this.state.snake.tail.length < 10 ? ["lose", "bolt", "nobounds", "faster"] : 
                  this.state.snake.tail.length < 30 ? ["lose", "gain", "nobounds", "faster", "gain", "gain", "nobounds", "lose"] :
                  this.state.snake.tail.length < 75 ? ["lose", "gain", "nobounds", "faster", "bolt", "nobounds", "lose", "lose", "bolt"] :
                  this.state.snake.tail.length > 75 ? ["gain", "lose", "nobounds", "faster", "lose", "lose", "nobounds", "lose", "bolt", "bolt", "bolt", "bolt", "bolt"] :
                    ["lose", "gain", "nobounds", "faster"];
    for(let i = 0; i < randomNumber; i++) {
      const iconType = type[Math.floor(Math.random() * type.length)];
        const col =  Math.floor(Math.random() * this.state.cols);
        const row = Math.floor(Math.random() * this.state.rows);
        const itype = iconType;

        this.icons.push({
          row,
          col,
          itype
        });

    };
    this.setState({
      icons: this.icons
    });
    return this.icons
  }

   gameTick() {
    this.setState((state) => {
      let {
        currentDirection,
        snake,
        food,
        followPosition,
        lifeCount,
        pauseGame,
        game,
        icons,
        time,
        hitTail,
        color,
        activeIcon,
        count,
        activeIconType
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

      followPosition = followPosition.concat(head);


    //check if head intersects with tail
      tail.forEach( t => {
        if(head.col === t.col && head.row === t.row){
          hitTail = true;
          pauseGame = true;
          lifeCount = lifeCount - 1;
          color = "E71D36";
          clearInterval(window.fnInterval);
        }else {
          //need this for lifecount in decrease
          hitTail = false;
        }
      });

      //snake eats

      food.forEach( f => {
        if(head.row === f.row && head.col === f.col){
        food = this.randomFood();
        icons = this.randomIcons();
        const value = followPosition[followPosition.length - 1].valueOf();
        tail = tail.concat(value);
        if(this.state.snake.tail.length > 2 && this.state.snake.tail.length % 5 === 0){
          clearInterval(window.fnInterval);
          this.tickTime = this.tickTime - 20;
          this.maxTime = 50;
          time = this.tickTime;
          window.fnInterval = setInterval(() => {
            this.gameTick();
          }, this.tickTime === this.maxTime ? this.maxTime : this.tickTime);
        }else{
          this.tickTime = this.tickTime;
        }
        const maybeBlack = state.color === "E71D36" ? "000000" : state.color;
        color = maybeBlack;

        return true
        }else {
          return false;
        }
      });


    //icon overlap

    icons.forEach(i => {
      if(head.row === i.row && head.col === i.col){
        if(i.itype === "faster"){
          clearInterval(window.fnInterval);
          activeIcon = true;
          activeIconType = "faster";
          this.tickTime = this.tickTime / 2;
          window.fnInterval = setInterval(() => {
              this.gameTick();
            }, this.tickTime);
        }else if(i.itype === "gain"){
          clearInterval(window.fnInterval);
          lifeCount = lifeCount + 1;
          window.fnInterval = setInterval(() => {
              this.gameTick();
            }, this.tickTime);
        }else if(i.itype === "lose"){
          lifeCount = lifeCount - 1;
          pauseGame = true;
          clearInterval(window.fnInterval);
        }else if(i.itype === "bolt"){
          clearInterval(window.fnInterval);
          activeIcon = true;
          activeIconType = "bolt";
          this.tickTime = this.tickTime / 5;
          window.fnInterval = setInterval(() => {
              this.gameTick();
            }, this.tickTime);
        }else if(i.itype === "nobounds"){
          activeIcon = true;
          activeIconType = "nobounds";
          color = "FCBA04";
        }
      }
    })
    console.log(this.tickTime);

    if(activeIcon){
      console.log('hitactive');
     count = state.count ++;
     console.log('count', count);
      if(count === 150 && activeIconType === "faster"){
        this.tickTime = state.time;
        count = 0;
        activeIconType = false;
        clearInterval(window.fnInterval);
        activeIcon = false;
        window.fnInterval = setInterval(() => {
                this.gameTick();
              }, this.tickTime);
      }else if(count === 100 && activeIconType === "bolt"){
        this.tickTime = state.time;
        count = 0;
        clearInterval(window.fnInterval);
        activeIcon = false;
        activeIconType = false;
        window.fnInterval = setInterval(() => {
                this.gameTick();
              }, this.tickTime);
      }else if(count === 50 && activeIconType === "nobounds"){
        count = 0;
        activeIconType = false;
        color = "000000";
      }

    }

    

    //lose life
      if(head.row < 0 || head.row > this.state.rows || head.col < 0 || head.col > this.state.cols){
        const num = activeIconType === "nobounds" ? 0 : 1;
        lifeCount = lifeCount - num;
        pauseGame = true;
        clearInterval(window.fnInterval);
        switch (currentDirection) {
          case 'left':
          head.col = head.col + 5;
          break;

          case 'up':
          head.row = head.row + 5;
          break;

          case 'down':
          head.row = head.row - 5;
          break;

          case 'right':
          head.col = head.col - 5;
          break;
        }
        if(tail.length > 0){
          const tMap = tail.map((seg, index) => {
            const i = index + 1;
            switch (currentDirection) {
              case 'left':
              seg.col = head.col + i;
              break;

              case 'up':
              seg.row = head.row + i;
              break;

              case 'down':
              seg.row = head.row - i;
              break;

              case 'right':
              seg.col = head.col - i;
              break;
            }

            return seg;
          });
        tail = tMap;
      }

      }else if(hitTail) {
        switch (currentDirection) {
            case 'left':
            head.col = head.col + 2;
            break;

            case 'up':
            head.row = head.row + 2;
            break;

            case 'down':
            head.row = head.row - 2;
            break;

            case 'right':
            head.col = head.col - 2;
            break;
          }
          const tMap = tail.map((seg, index) => {
            const i = index + 1;
            switch (currentDirection) {
              case 'left':
              seg.col = seg.col + 2;
              break;

              case 'up':
              seg.row = seg.row + 2;
              break;

              case 'down':
              seg.row = seg.row - 2;
              break;

              case 'right':
              seg.col = seg.col - 2;
              break;
            }

            return seg;
          });
        tail = tMap;
        clearInterval(window.fnInterval);
      }else {
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
        if(tail.length > 0){
          const tMap = tail.map((seg, index) => {
            const tdex = index + 2;
            const value = followPosition[followPosition.length - tdex].valueOf();
            seg = value;
            return seg;
          });
          tail = tMap;
        }
      }

    const newState = {
      ...state,
      food,
      color,
      icons,
      game,
      followPosition,
      activeIcon,
      activeIconType,
      count,
      time,
      snake: {
        head,
        tail
      },
      lifeCount,
      currentDirection,
      pauseGame,
    }
    const grid = this.renderGrid(newState, true);
    return {
      ...newState,
      grid,
    }
    });
    if(this.state.pauseGame){
          if(this.state.lifeCount > 0){
            window.fnInterval = setInterval(() => {
              this.gameTick();
            }, this.tickTime);
            const opposite =  this.state.currentDirection === "up" ? "left" : 
                              this.state.currentDirection === "down" ? "right" :
                              this.state.currentDirection === "left" ? "up" : "down";
            this.setState({
              pauseGame: false,
              hitTail: false,
              currentDirection: opposite
            });

        }else {
          this.setState({
            game: false
          });
        }
      }
  }


  movingDot(evt) {
     let { currentDirection } = this.state;
    switch (evt.keyCode) {
      //left arrow
      case 37: 
      if(currentDirection === "right"){
        currentDirection = 'up';
      }else {
        currentDirection = 'left';
      }
      break;

      //right arrow
      case 39:
        if(currentDirection === "left"){
        currentDirection = 'down';
      }else {
        currentDirection = 'right';
      }
      break;

      //up arrow
      case 38:
        if(currentDirection === "down"){
        currentDirection = 'left';
      }else {
        currentDirection = 'up';
      }
      break;

      //down arrow
      case 40:
        if(currentDirection === "up"){
        currentDirection = 'right';
      }else {
        currentDirection = 'down';
      }
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
    const halfWidth = window.innerWidth / 2;
    const centerPause = halfWidth - 243.6875;

//Map for grid
    const grid = this.state.grid;
    this.grid = grid.map((cell, index)=> {
      if(cell.isTail){
        return <div
        key={cell.row+index+ '-' + cell.col}
        className={cell.isTail ? "grid-item is-tail" : "grid-item"} ><Dot
                                                                        color={this.state.color}
                                                                        /></div>
      }else if(cell.isHead){
        return <div
        key={cell.row+index+ '-' + cell.col}
        className={cell.isHead ? "grid-item is-head blink-animation" : "grid-item"} ><Dot
                                                                                      color={this.state.color}
                                                                                      /></div>
      }else if(cell.isFood){
        return <div
        key={cell.row+index+ '-' + cell.col}
        className={cell.isFood ? "grid-item is-food" : "grid-item"} ><Dot
                                                                      color={cell.color}
                                                                      /></div>
      }else if(cell.isIcon){
        if(cell.type === "faster"){
          return <div
            key={cell.row+index+ '-' + cell.col}
            className="grid-item"><SpeedUp />
                </div>
        }else if(cell.type === "bolt"){
          return <div
            key={cell.row+index+ '-' + cell.col}
            className="grid-item"><LightSpeed />
                </div>
        }else if(cell.type === "lose"){
          return <div
            key={cell.row+index+ '-' + cell.col}
            className="grid-item"><Bomb />
                </div>
        }else if(cell.type === "gain"){
          return <div
            key={cell.row+index+ '-' + cell.col}
            className="grid-item"><GainALife />
                </div>
        }else if(cell.type === "nobounds"){
          return <div
            key={cell.row+index+ '-' + cell.col}
            className="grid-item"><NoBoundaries />
                </div>
        }else if(cell.type === "gain"){
          return <div
            key={cell.row+index+ '-' + cell.col}
            className="grid-item"><GainALife />
                </div>
        }
      }else{
      return <div
        key={cell.row+index+ '-' + cell.col}
        className="grid-item" ></div>
      }
    })

    return (
      <div style={{height: window.innerHeight, width: window.innerWidth}}>
        <React.Fragment>
          <TitleBar
            livesCount={this.state.lifeCount}
            dotCount={this.state.snake.tail.length}
             />
          <div id="game-board">
            <div id="grid" style={{height: this.gridHeight + 'px', width: this.gridWidth + 'px'}} >
              {this.state.game ? this.grid :
                <div id="game-over">
              <h1> Game Over </h1>
              <h3 onClick={this.handleonclick}> Try Again </h3>
              </div> }
            </div>
          </div>
        </React.Fragment>
    </div>
    );
  }
}


export default App;

