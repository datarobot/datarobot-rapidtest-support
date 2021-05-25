// @ts-nocheck
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';

import { headerCellCheckedAtom } from 'rt-store';

import Checkbox from 'components/Checkbox';
import Input from 'components/Input';

import AccountFilter from '../TableAdvancedV2/AccountRenderers/Filter';
import AccountsSort from './AccountsSort';
import SitesSort from './SitesSort';

export const Header = ({
  gridApi,
  columnApi,
  handleCheckChange,
  handleFilterChange,
  tableButtons,
}) => {
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
    <>
      <div className="flex items-center header-cell mb-4">
        <Input
          v2
          onChange={handleFilterChange}
          placeholder="Search"
          icon="search"
          isSearch
          wrapperClass="flex-1 mr-3"
          className="self-center"
        />
        {tableButtons}
      </div>
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
    </>
  );
};

export default Header;
