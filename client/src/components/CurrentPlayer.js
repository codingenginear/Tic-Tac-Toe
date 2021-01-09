import React from 'react';
import './CurrentPlayer.scss'

const CurrentPlayer = ({ currentPlayer, isGameOver }) => {
  return (
    <h2 className="current-player">
      { isGameOver ? `Player ${currentPlayer} wins!` : `It's Player ${currentPlayer}'s turn`}
    </h2>
  );
};

export default CurrentPlayer;