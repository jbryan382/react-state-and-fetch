import React, { Component } from 'react'
import Gameboard from './components/Gameboard'

export class App extends Component {
  state = {
    id: null,
    board: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    winner: null,
  }

  handleCellClick = async (row, column) => {
    if (
      // No game id
      this.state.id === undefined ||
      // A winner exists
      this.state.winner ||
      // The space isn't blank
      this.state.board[row][column] !== ' '
    ) {
      return
    } else {
      // Generate the URL we need
      const url = `https://sdg-tic-tac-toe-api.herokuapp.com/game/${this.state.id}`
      // Make an object to send as JSON
      const body = { row: row, column: column }
      // Make a POST request to make a move
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.status === 200) {
        // Get the response as JSON
        const game = await response.json()
        // Make that the new state!
        this.setState(game)
      }
    }
  }

  handleNewGame = async () => {
    // Make a POST request to ask for a new game
    const response = await fetch(
      'https://sdg-tic-tac-toe-api.herokuapp.com/game',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )
    if (response.status === 200) {
      // Get the response as JSON
      const game = await response.json()
      console.log(game)
      // Make that the new state!
      this.setState(game)
    }
  }

  componentDidMount() {
    this.handleNewGame
  }

  render() {
    const header = 'Tic Tac Toe'
    return (
      <div>
        <h1>
          {this.state.winner ? `${this.state.winner} is the winner` : header} -
          <button onClick={this.handleNewGame}>New</button>
          <Gameboard
            unicorn={this.state.board}
            funcClick={this.handleCellClick}
          />
        </h1>
      </div>
    )
  }
}
