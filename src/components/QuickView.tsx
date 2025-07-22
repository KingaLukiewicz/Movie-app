import React from 'react';
import './QuickView.css';

const QuickView = ({ text }) => {
  return (
    <div className="QuickView">
      <div className="Card">{text}</div>
    </div>
  );
};

export default QuickView;
