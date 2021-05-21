// @ts-nocheck
import { useAtom } from 'jotai';

import { headerCellCheckedAtom } from 'rt-store';

import Checkbox from 'components/Checkbox';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import { AccountFilter } from '../TableAdvancedV2';

export const AccountsSort = ({ columnApi }) => {
  const onChange = (newValue) => {
    const state = [newValue?.value || { colId: 'name', sort: 'asc' }];
    columnApi.applyColumnState({
      state,
      defaultState: { sort: null },
    });
  };

  return (
    <Select
      className="Filter small ml-4 flex-1"
      classNamePrefix="Filter"
      placeholder="Sort"
      isClearable={true}
      isSearchable={false}
      options={[
        { label: 'Name A-Z', value: { colId: 'name', sort: 'asc' } },
        { label: 'Name Z-A', value: { colId: 'name', sort: 'desc' } },
        { label: 'Email A-Z', value: { colId: 'email', sort: 'asc' } },
        { label: 'Email Z-A', value: { colId: 'email', sort: 'desc' } },
        { label: 'Added A-Z', value: { colId: 'added', sort: 'asc' } },
        {
          label: 'Added Z-A',
          value: { colId: 'added', sort: 'desc' },
        },
        { label: 'Status A-Z', value: { colId: 'status', sort: 'asc' } },
        { label: 'Status Z-A', value: { colId: 'status', sort: 'desc' } },
      ]}
      onChange={onChange}
    />
  );
};

export const SitesSort = ({ columnApi }) => {
  const onChange = (newValue) => {
    const state = [newValue?.value || { colId: 'siteName', sort: 'asc' }];
    columnApi.applyColumnState({
      state,
      defaultState: { sort: null },
    });
  };

  return (
    <Select
      className="Filter small ml-4 flex-1"
      classNamePrefix="Filter"
      placeholder="Sort"
      isClearable={true}
      isSearchable={false}
      options={[
        { label: 'Name A-Z', value: { colId: 'siteName', sort: 'asc' } },
        { label: 'Name Z-A', value: { colId: 'siteName', sort: 'desc' } },
        { label: 'Address A-Z', value: { colId: 'address', sort: 'asc' } },
        { label: 'Address Z-A', value: { colId: 'address', sort: 'desc' } },
        { label: 'District A-Z', value: { colId: 'district', sort: 'asc' } },
        {
          label: 'District Z-A',
          value: { colId: 'district', sort: 'desc' },
        },
        { label: 'Contact A-Z', value: { colId: 'contact', sort: 'asc' } },
        { label: 'Contact Z-A', value: { colId: 'contact', sort: 'desc' } },
      ]}
      onChange={onChange}
    />
  );
};

const Header = ({ gridApi, columnApi, handleCheckChange }) => {
  const [isChecked, setIsChecked] = useAtom(headerCellCheckedAtom);

  const getData = () => {
    const dataArr = [];

    for (const key in gridApi.getRenderedNodes()) {
      if (Object.hasOwnProperty.call(gridApi.getRenderedNodes(), key)) {
        const { data } = gridApi.getRenderedNodes()[key];
        dataArr.push(data);
      }
    }

    return dataArr;
  };

  const { pathname } = useLocation();
  const isAccounts = pathname.includes('/accounts');
  const isSites = pathname.includes('/sites');

  return (
    <div className="flex items-center header-cell">
      <div className="header-cell-checkbox">
        <Checkbox
          v2
          checkClass="z-10"
          onChange={() => {
            setIsChecked(!isChecked);
            handleCheckChange(getData(), isChecked);
          }}
          isChecked={isChecked}
        />
      </div>
      {isAccounts && <AccountsSort columnApi={columnApi} />}
      {isAccounts && <AccountFilter small />}
      {isSites && <SitesSort columnApi={columnApi} />}
    </div>
  );
};

export default Header;
