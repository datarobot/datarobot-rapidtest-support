// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({
  iconName,
  fontSize,
  size,
  className,
  wrapperClass,
  color,
  fill,
  dataCy,
  fixedWidth,
  ...rest
}) => {
  // eslint-disable-next-line no-unused-vars
  const { direction, height, ...awesomeProps } = rest;

  return (
    <span style={{ fontSize }} className={wrapperClass}>
      <FontAwesomeIcon
        className={className}
        size={size}
        color={color || fill}
        icon={iconName}
        data-cy={dataCy}
        fixedWidth={fixedWidth}
        {...awesomeProps}
      />
    </span>
  );
};

Icon.defaultProps = {
  size: '1x',
  fixedWidth: false,
};

Icon.propTypes = {
  type: PropTypes.string,
  iconName: PropTypes.string,
  fontSize: PropTypes.number,
  size: PropTypes.oneOf([
    'xs',
    'lg',
    'sm',
    '1x',
    '2x',
    '3x',
    '4x',
    '5x',
    '6x',
    '7x',
    '8x',
    '9x',
    '10x',
  ]),
  className: PropTypes.string,
  color: PropTypes.string,
  fill: PropTypes.string,
  dataCy: PropTypes.string,
  fixedWidth: PropTypes.bool,
};

export default Icon;
