import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const boardSize = 3

function Square(props) {
  return (
    <button
      className={`square ${props.winnerLine.includes(props.index) ? 'bold' : ''}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}


class Board extends React.Component {

  renderSquare(i) {

    return (
      <Square
        index = {i}
        winnerLine={this.props.winnerLine}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }
  renderBoardRow() {
    return Array(boardSize).fill(1).map((item, i) => {
      const row = Array(boardSize).fill(2).map((jItem, j) => {
        return this.renderSquare(i * boardSize + j)
      })
      return (<div key={i} className="board-row">{row}</div>)

    })
  }
  render() {
    return (
      <div>
        {this.renderBoardRow()}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: null,
        flag: null
      }],
      stepNumber: 0,
      xIsNexty: true,
      isReverse: false
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = [...current.squares]
    //落子的坐标
    const position = getPosition(i)
    // console.log(11,calculateWinner(squares),!squares.includes(null))

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    const flag = this.state.xIsNexty ? 'x' : 'o'
    squares[i] = flag
    this.setState({
      history: [...history, { squares, position, flag }],
      stepNumber: history.length,
      xIsNexty: !this.state.xIsNexty,
    })
    if (!calculateWinner(squares) && !squares.includes(null)) {
      return alert('平局了')
    }
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNexty: (step % 2) === 0
    })
  }
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    let moves = history.map((step, move) => {
      const desc = move ? `${step.flag}落子在${step.position},跳转到第${move}步` : '开始游戏'
      return (
        <li key={move} className={move === this.state.stepNumber ? 'bold' : ''}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    if (this.state.isReverse) {
      moves = moves.reverse()
    }

    let status;
    const winnerLine = calculateWinnerLine(current.squares)
    console.log('winnerLine', winnerLine)
    if (winner) {
      status = '获胜者是：' + winner
    } else {
      status = '下一位落子的是: ' + (this.state.xIsNexty ? 'x' : 'o');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            winnerLine={winnerLine}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <button onClick={() => this.setState({ isReverse: !this.state.isReverse })}>升/降序</button>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function calculateWinnerLine(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return [];
}
function getPosition(index, size = 3) {
  index += 1
  const x = index % size ? index % size : size
  const y = Math.ceil(index / size)
  return `${y}行,${x}列`
}
