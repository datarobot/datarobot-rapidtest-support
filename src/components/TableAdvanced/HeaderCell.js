// @ts-nocheck
import { useEffect, useState } from 'react';
import cls from 'classnames';
import { useAtom } from 'jotai';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';

import Checkbox from 'components/Checkbox';
import Icon from 'components/Icon';

import { headerCellCheckedAtom } from 'rt-store';

const HeaderCell = (props) => {
  const [, setAscSort] = useState('inactive');
  const [, setDescSort] = useState('inactive');
  const [, setNoSort] = useState('inactive');
  const [isChecked, setIsChecked] = useAtom(headerCellCheckedAtom);

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

  const getData = () => {
    const dataArr = [];

    for (const key in props.api.getRenderedNodes()) {
      if (Object.hasOwnProperty.call(props.api.getRenderedNodes(), key)) {
        const { data } = props.api.getRenderedNodes()[key];
        dataArr.push(data);
      }
    }

    return dataArr;
  };

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div className="inline-block ml-2 header-sort">
        {props.column.isSortAscending() && <Icon iconName={faSortDown} />}
        {props.column.isSortDescending() && <Icon iconName={faSortUp} />}
        {!props.column.isSortAscending() &&
          !props.column.isSortDescending() && <Icon iconName={faSort} />}
      </div>
    );
  }

  return (
    <div className="flex pr-4 items-center header-cell">
      {props.showCheck && (
        <Checkbox
          checkClass="z-10"
          onChange={() => {
            setIsChecked(!isChecked);
            props.handleCheckChange(getData(), isChecked);
          }}
          isChecked={isChecked}
        />
      )}
      <span
        className={cls('flex w-full', {
          'justify-end': props.textEnd,
        })}
        onClick={onSortRequested}
      >
        <div className="customHeaderLabel">{props.displayName}</div>
        {sort}
      </span>
    </div>
  );
};

export default HeaderCell;
