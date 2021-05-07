import React from 'react';
import cls from 'classnames';
import { Link } from 'react-router-dom';

import './Segments.css';

const Segments = ({ className, names, links, current, setCurrent }) => {
  return (
    <div className={cls('Segments', className)}>
      {names.map((name, index) => {
        return links && links[index] ? (
          <Link
            to={links[index]}
            key={`${name}-${index}`}
            className={cls('segment no-underline', {
              active: current === index,
            })}
            onClick={() => setCurrent(index)}
          >
            {name}
          </Link>
        ) : (
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
