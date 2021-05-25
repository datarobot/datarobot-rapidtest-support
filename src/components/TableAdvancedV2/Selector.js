/* eslint-disable no-unused-vars */
// @ts-nocheck
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';

import {
  accountsAtom,
  accountsToDisableAtom,
  accountIdsToDisableAtom,
  sitesAtom,
  sitesToDisableAtom,
  siteIdsToDisableAtom,
  headerCellCheckedAtom,
} from 'rt-store';

const Selector = ({ gridApi, pageSize }) => {
  const { pathname } = useLocation();
  const [accountsToDisable, setAccountsToDisable] = useAtom(
    accountsToDisableAtom
  );
  const [accountIdsToDisable, setAccountIdsToDisable] = useAtom(
    accountIdsToDisableAtom
  );
  const [sitesToDisable, setSitesToDisable] = useAtom(sitesToDisableAtom);
  const [siteIdsToDisable, setSiteIdsToDisable] = useAtom(siteIdsToDisableAtom);
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [sites, setSites] = useAtom(sitesAtom);
  const [isHeaderChecked, setIsHeaderChecked] = useAtom(headerCellCheckedAtom);
  const isAccounts = pathname.includes('/accounts');
  const isSites = pathname.includes('/sites');

  const getAllRows = () => {
    const rowData = [];
    gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  };

  const selectAllAccounts = () => {
    const ids = getAllRows().map(({ id }) => id);
    setAccountsToDisable(getAllRows());
    setAccountIdsToDisable(ids);
    setIsHeaderChecked(true);
  };

  const deselectAllAccounts = () => {
    setAccountsToDisable([]);
    setAccountIdsToDisable([]);
    setIsHeaderChecked(false);
  };

  const selectAllSites = () => {
    const ids = getAllRows().map(({ id }) => id);
    setSitesToDisable(getAllRows());
    setSiteIdsToDisable(ids);
    setIsHeaderChecked(true);
  };

  const deselectAllSites = () => {
    setSitesToDisable([]);
    setSiteIdsToDisable([]);
    setIsHeaderChecked(false);
  };

  return (
    <>
      {isAccounts && accountsToDisable.length > 0 && (
        <span className="selector">
          <p>
            Accounts selected: <strong>{accountsToDisable.length}</strong>
          </p>
          {accounts.length !== accountIdsToDisable.length ? (
            <>
              <button
                type="button"
                className="btn-clear px-2"
                onClick={selectAllAccounts}
              >
                Select all?
              </button>
              <button
                type="button"
                className="btn-clear px-2"
                onClick={deselectAllAccounts}
              >
                Clear selection
              </button>
            </>
          ) : (
            <>
              {accountIdsToDisable.length > pageSize && (
                <button
                  type="button"
                  className="btn-clear px-2"
                  onClick={deselectAllAccounts}
                >
                  Deselect all?
                </button>
              )}
            </>
          )}
        </span>
      )}

      {isSites && sitesToDisable.length > 0 && (
        <span className="selector">
          <p>
            Sites selected: <strong>{sitesToDisable.length}</strong>
          </p>
          {sites.length !== siteIdsToDisable.length ? (
            <>
              <button
                type="button"
                className="btn-clear px-2"
                onClick={selectAllSites}
              >
                Select all?
              </button>
              <button
                type="button"
                className="btn-clear px-2"
                onClick={deselectAllSites}
              >
                Clear selection
              </button>
            </>
          ) : (
            <>
              {siteIdsToDisable.length > pageSize && (
                <button
                  type="button"
                  className="btn-clear ml-2 px-2"
                  onClick={deselectAllSites}
                >
                  Deselect all?
                </button>
              )}
            </>
          )}
        </span>
      )}
    </>
  );
};

export default Selector;
