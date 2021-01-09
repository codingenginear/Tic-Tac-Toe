import React, { Component } from 'react';
import Score from './Score';
import './ScoreBoard.scss';


class ScoreBoard extends Component {
  render() { 
    const { scores } = this.props;
    console.log(scores);
    const scoreHistory = scores.map(score => {
      return (<Score 
              key = {score.id}
              score={score}
            />) 
    })
    return (
      <>
      
      <div className="score-board">
        <h3 className="score-board__header">Scoreboard</h3>
        {scoreHistory}
      </div>
      </>
    );
  }
}

export default ScoreBoard;