import React from 'react';
import './Background.css';

type AnimatedBackgroundProps = {
    style: React.CSSProperties;
  };
  
  const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ style }) => {
    return (
      <div className="area" style={style}>
        <ul className="circles">
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>        </ul>
      </div>
    );
  };


export default AnimatedBackground;
