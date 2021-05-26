import React, { Component } from 'react'

class Gameboard extends Component {
  getClassName = cell => {
    switch (cell) {
      case 'X':
        return 'isX'
      case 'O':
        return 'isO'
      default:
        return 'cell'
    }
  }
  render() {
    return (
      <ul>
        {this.props.unicorn.map((boardRow, rowIndex) => {
          return boardRow.map((cell, columnIndex) => {
            return (
              <li
                key={columnIndex}
                className={this.getClassName(cell)}
                onClick={() => this.props.funcClick(rowIndex, columnIndex)}
              >
                {cell}
              </li>
            )
          })
        })}
      </ul>
    )
  }
}

export default Gameboard
