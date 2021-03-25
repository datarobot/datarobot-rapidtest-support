// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

import Checkbox from 'components/Checkbox';
import Icon from 'components/Icon';

const HeaderCell = (props) => {
  const [, setAscSort] = useState('inactive');
  const [, setDescSort] = useState('inactive');
  const [, setNoSort] = useState('inactive');
  const [isChecked, setIsChecked] = useState(false);
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
    console.log('sort changed');
    props.setSort(getSortOrder(), e.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
  }, []);

  const getIds = () => {
    const ids = [];

    for (const key in props.api.getRenderedNodes()) {
      if (Object.hasOwnProperty.call(props.api.getRenderedNodes(), key)) {
        const { data } = props.api.getRenderedNodes()[key];
        ids.push(data.id);
      }
    }

    return ids;
  };

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
    <div className="flex pr-4 items-center">
      {props.showCheck && (
        <Checkbox
          checkClass="z-10"
          onChange={() => {
            setIsChecked(!isChecked);
            props.handleCheckChange(getIds(), isChecked);
          }}
          isChecked={isChecked}
        />
      )}
      <span className="flex justify-between w-full" onClick={onSortRequested}>
        <div className="customHeaderLabel">{props.displayName}</div>
        {sort}
      </span>
    </div>
  );
};

export default HeaderCell;
