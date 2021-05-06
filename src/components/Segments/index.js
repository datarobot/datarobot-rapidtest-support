import React from 'react';
import cls from 'classnames';

import './Segments.css';

const Segments = ({ names, current, setCurrent }) => {
  return (
    <div className="Segments">
      {names.map((name, index) => {
        return (
          <div
            key={`${name}-${index}`}
            className={cls('segment', { active: current === index })}
            onClick={() => setCurrent(index)}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default Segments;
