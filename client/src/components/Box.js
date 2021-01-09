import React from 'react';
import './Box.scss';

const Box = ({ index, content, updateClickTracker }) => {
  const handleClick = (index) => {
    updateClickTracker(index)
  }

  return (
    <div className="box" onClick={() => handleClick(index)}>
      <p className="box__p">{content}</p>
    </div>
  );
};

export default Box;