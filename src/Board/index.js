import React from 'react';
import Square from '../Square';

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
  
  export default Board;