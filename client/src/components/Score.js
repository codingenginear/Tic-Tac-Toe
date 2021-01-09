import React from 'react';
import './Score.scss';

const Score = (props) => {
  const { playerX, playerO, results, timestamp } = props.score;
  const playerXClass = results === 'X' ? 'score__player--winner' : "score__player--loser";
  const playerOClass = results === 'O' ? 'score__player--winner' : "score__player--loser"; 
  console.log(results);
  return (
    <div className="score">
      <p className="score__players">
        <span className={`score__player ${playerXClass}`}>{playerX}</span> 
         vs.  
        <span className={`score__player ${playerOClass}`}>{playerO}</span>
      </p>
      
    </div>
  );
};

export default Score;