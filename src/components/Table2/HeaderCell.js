import React, { useEffect, useRef, useState } from 'react';

import Icon from 'components/Icon';

const HeaderCell = (props) => {
  const [, setAscSort] = useState('inactive');
  const [, setDescSort] = useState('inactive');
  const [, setNoSort] = useState('inactive');
  const refButton = useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? 'active'
        : 'inactive'
    );
  };

  const getSortOrder = () => {
    if (!props.column.isSortAscending() && !props.column.isSortDescending()) {
      return 'asc';
    }

    if (props.column.isSortAscending()) {
      return 'desc';
    }

    if (props.column.isSortDescending()) {
      return '';
    }
  };

  const onSortRequested = (e) => {
    props.setSort(getSortOrder(), e.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
  }, []);

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="customHeaderMenuButton"
        onClick={() => onMenuClicked()}
      >
        <i className={`fa ${props.menuIcon}`}></i>
      </div>
    );
  }

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div style={{ display: 'inline-block' }}>
        {props.column.isSortAscending() && <Icon iconName="sort-down" />}
        {props.column.isSortDescending() && <Icon iconName="sort-up" />}
        {!props.column.isSortAscending() &&
          !props.column.isSortDescending() && <Icon iconName="sort" />}
      </div>
    );
  }

  return (
    <div className="flex pr-4" onClick={onSortRequested}>
      {menu}
      <span className="flex justify-between w-full">
        <div className="customHeaderLabel">{props.displayName}</div>
        {sort}
      </span>
    </div>
  );
};

export default HeaderCell;