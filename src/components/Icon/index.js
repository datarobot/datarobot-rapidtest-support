import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'components/Icon/iconImports';

// To avoid TS check
import styles from './icon.module.css';

/* Brands Types (Collections) */
const typeRegular = 'far';
const typeSolid = 'fas';
const typeBrand = 'fab';

// the following function allows us to convert direction to rotation value
const getRotation = (direction) => {
  switch (direction) {
    case 'up': {
      return 180;
    }
    case 'left': {
      return 90;
    }
    case 'right': {
      return 270;
    }
    case 'down':
    default: {
      return undefined;
    }
  }
};

const getIconClass = (iconClassName) => {
  const names = iconClassName ? iconClassName.split(' ') : [];
  const onlyUnique = (value, index, self) => self.indexOf(value) === index;
  return names
    .map((name) => {
      if (name && styles[name]) {
        try {
          return styles[name];
        } catch (e) {
          return name;
        }
      }
      return name;
    })
    .filter((name) => !!name)
    .filter(onlyUnique)
    .join(' ');
};

const deprecatedProperties = {
  height:
    'The "height" property that you are using was deprecated. Please use the "fontSize" (css or property) instead!',
  diameter:
    'The "diameter" property that you are using was deprecated. Please use the "fontSize" (css or property) instead!',
  fill:
    'The "fill" property that you are using was deprecated. Please use the "color" (css or property) instead!',
};

const checkDeprication = (value, key) => {
  if (value) {
    // eslint-disable-next-line no-console
    console.warn(deprecatedProperties[key]);
  }
};

const getAwesomeIcon = (
  // the Font Awesome Icon name
  iconName,
  // the Font Awesome library type
  type,
  // the name of class in './icons.module.css' (in case you need to change the color or font-size of icon)
  iconClassName
) => {
  const Icon = ({
    size,
    className,
    dataCy,
    height,
    fontSize,
    fill,
    color,
    direction,
    rotation,
    ...rest
  }) => {
    // an extra check of deprecating properties
    checkDeprication(height, 'height');
    // @ts-ignore
    checkDeprication(rest.diameter, 'diameter');
    checkDeprication(fill, 'fill');

    const iconClass = getIconClass(iconClassName);
    return (
      <Icon
        type={type}
        iconName={iconName}
        fontSize={fontSize || height}
        size={size}
        color={color || fill}
        rotation={rotation || getRotation(direction)}
        className={classNames([iconClass, className])}
        dataCy={dataCy}
        {...rest}
      />
    );
  };

  Icon.defaultProps = {
    size: '1x',
  };
  return Icon;
};

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
  type: typeRegular,
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

getAwesomeIcon.defaultProps = {
  type: typeRegular,
};
getAwesomeIcon.propTypes = {
  // the Font Awesome Icon name
  iconName: PropTypes.string,
  // the Font Awesome library type
  type: PropTypes.string,
  // the name of class in './icons.module.css' (in case you need to change the color or font-size of icon)
  iconClassName: PropTypes.string,
};

export { getAwesomeIcon, typeRegular, typeSolid, typeBrand, getRotation };
export default Icon;
