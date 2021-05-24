import { useEffect, useRef, useState } from 'react';
import cls from 'classnames';

import './Dropdown.css';

const useClickOutside = (callback) => {
  const ref = useRef();
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
  return ref;
};

const Dropdown = ({ children }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const closeMenu = () => setMenuOpened(false);
  const clickRef = useClickOutside(closeMenu);
  return (
    <div className="Dropdown" ref={clickRef}>
      <div
        className={cls('control', { menuOpened })}
        onClick={() => setMenuOpened(!menuOpened)}
      >
        <svg
          width="4"
          height="24"
          viewBox="0 0 4 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2ZM4 12C4 13.1046 3.10457 14 2 14C0.895431 14 0 13.1046 0 12C0 10.8954 0.895431 10 2 10C3.10457 10 4 10.8954 4 12ZM2 24C3.10457 24 4 23.1046 4 22C4 20.8954 3.10457 20 2 20C0.895431 20 0 20.8954 0 22C0 23.1046 0.895431 24 2 24Z"
            fill="#5B5FF0"
          />
        </svg>
      </div>
      <div className={cls('menu', { menuOpened })} onClick={closeMenu}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
