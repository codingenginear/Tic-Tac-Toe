import React, { Component } from 'react';
import CurrentPlayer from './CurrentPlayer';
import Box from './Box';
import './Board.scss';
import axios from 'axios';

class Board extends Component {
  
  state = {
    currentPlayer: "X",
    clickedBoxes: 0,
    clickTracker: new Array(9).fill(""),
    isGameOver: false,
    scores: []
  }

  updateClickTracker = (index) => {
    const {currentPlayer, clickedBoxes, clickTracker, isGameOver } = this.state;
    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    if (clickTracker[index] === "" && isGameOver === false) {
      const clicksArr = clickTracker;
      clicksArr[index] = currentPlayer;
      this.setState({
        clickTracker: clicksArr,
        currentPlayer: nextPlayer,
        clickedBoxes: clickedBoxes + 1
      
      }, () => {
        this.checkWin(this.state.clickTracker);
      });
    }
  }

  checkWin = (clickTracker) => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    
    for (let i = 0; i < winCombos.length; i++) {
      const [ a, b, c ] = winCombos[i];
      console.log(a, b, c);
      if (clickTracker[a] === "" || clickTracker[b] === "" || clickTracker[c] === "") {
        continue;
      } else if (clickTracker[a] && (clickTracker[a] === clickTracker[b] && clickTracker[b] === clickTracker[c])) {
        const winner = this.state.currentPlayer === "X" ? "O" : "X";
        this.setState({
          isGameOver: true,
          currentPlayer: winner
        });
      }
    }
  }

  handleSaveScore = (gameId) => {
    // bring in a function from parent to update state with all the scores
    const updatedGame = {
      results: this.state.currentPlayer
    }
    axios.put(process.env.REACT_APP_API_URL + "/games/" + gameId, updatedGame)
    .then(response => {
      this.props.fetchGameData();
    })
    .catch((error) => console.log(error));
  }

  render() {

    const boxes = this.state.clickTracker.map((box, i) => {
      return (
          <Box 
            key={i}
            index={i}
            content={this.state.clickTracker[i]}
            updateClickTracker={this.updateClickTracker} 
          />
        )
    });

    return (
      
      <div>
        <CurrentPlayer 
          currentPlayer={this.state.currentPlayer}
          isGameOver={this.state.isGameOver}
        />
        <div className="board">
          {boxes}
        </div>
        {this.state.isGameOver ?  
        <button className="board__button"
          onClick={() => {
            console.log(this.props.currentGameId);
            this.handleSaveScore(this.props.currentGameId)
          }} 
        >Save Game</button> : 
        "" }
      </div>
      
    );
  }
}

export default Board;