import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          <span className="context">Casa 1</span>{this.renderSquare(0)}
          <span className="context">Casa 2</span>{this.renderSquare(1)}
          <span className="context">Casa 3</span>{this.renderSquare(2)}
        </div>
        <div className="board-row">
          <span className="context">Casa 4</span>{this.renderSquare(3)}
          <span className="context">Casa 5</span>{this.renderSquare(4)}
          <span className="context">Casa 6</span>{this.renderSquare(5)}
        </div>
        <div className="board-row">
          <span className="context">Casa 7</span>{this.renderSquare(6)}
          <span className="context">Casa 8</span>{this.renderSquare(7)}
          <span className="context">Casa 9</span>{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    statusFocus("status");
    const history = this.state.history.slice(0, this.state.stepNumber +1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares        
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    //console.log(squares.every(elem => elem !== null));
  }

  jumpTo(step) {
    statusFocus("status");
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Ir para jogada #' + move :
        'Ir para o início do jogo';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    } );

    let status;
    if (winner) {
      status = 'Vencedor: ' + winner;
    } else if (current.squares.every(elem => elem !== null)) {
      status = 'Deu velha!';
    } else {
      status = 'Próximo jogador: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div id="status" tabIndex="0">{status}</div>
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
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

  function statusFocus(id) {
    document.getElementById(id).focus();
  }