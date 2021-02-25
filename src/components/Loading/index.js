import cls from 'classnames';

import './Loading.css';

const Loading = ({
  color = '#00528D',
  className = '',
  containerClassName = '',
  style = {},
  size = 80,
}) => (
  <div className={cls('loading-container', containerClassName)}>
    <div
      className={cls('loader', className)}
      style={{ width: size, height: size, ...style }}
    >
      <div
        className="loader-after"
        style={{
          borderColor: `${color} transparent`,
          borderWidth: size * 0.1,
          width: size * 0.7 - 6,
          height: size * 0.7 - 6,
        }}
      ></div>
    </div>
  </div>
);

export default Loading;
