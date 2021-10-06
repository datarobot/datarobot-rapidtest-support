/* eslint-disable no-unused-vars */
// @ts-nocheck
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';

import Icon from 'components/Icon';
import Modal from 'components/Modal';

import {
  accountsAtom,
  accountsToDisableAtom,
  accountIdsToDisableAtom,
  sitesAtom,
  sitesToDisableAtom,
  siteIdsToDisableAtom,
  headerCellCheckedAtom,
} from 'rt-store';

const CalculateCurrentView = ({ pageIndex, pageSize, rows }) => {
  const offset = pageIndex * pageSize + 1;
  const totalOffset =
    (pageIndex + 1) * pageSize < rows ? (pageIndex + 1) * pageSize : rows;
  const totalEntries = rows;

  return (
    <p style={{ marginTop: '-4px' }} className="text-sm mx-2">
      <strong>{offset}</strong> - <strong>{totalOffset}</strong> of{' '}
      <strong>{totalEntries}</strong>
    </p>
  );
};

const Pagination = ({
  currentPage,
  gridApi,
  isFirstPage,
  isLastPage,
  pageSize,
  rowCount,
  onActivate,
  onDeactivate,
  onPageSizeChange,
  // totalPages,
}) => {
  const { pathname } = useLocation();
  const [showModal, setShowModal] = useState(false);
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
  const onBtnFirst = () => gridApi.paginationGoToFirstPage();
  const onBtnLast = () => gridApi.paginationGoToLastPage();
  const onBtnNext = () => gridApi.paginationGoToNextPage();
  const onBtnPrevious = () => gridApi.paginationGoToPreviousPage();
  const isAccounts = pathname.includes('/accounts');
  const isSites = pathname.includes('/sites');

  const getAllRows = () => {
    const rowData = [];
    gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  };

  const handleDeactivate = () => {
    pathname.includes('sites') ? setShowModal(true) : onDeactivate();
  };

  const selectAllAccounts = () => {
    const acctIds = getAllRows().map(({ id }) => id);
    setAccountsToDisable(getAllRows());
    setAccountIdsToDisable(acctIds);
    setIsHeaderChecked(true);
  };

  const deselectAllAccounts = () => {
    setAccountsToDisable([]);
    setAccountIdsToDisable([]);
    setIsHeaderChecked(false);
  };

  const selectAllSites = () => {
    const acctIds = getAllRows().map(({ id }) => id);
    setSitesToDisable(getAllRows());
    setSiteIdsToDisable(acctIds);
    setIsHeaderChecked(true);
  };

  const deselectAllSites = () => {
    setSitesToDisable([]);
    setSiteIdsToDisable([]);
    setIsHeaderChecked(false);
  };

  return (
    <div className="pagination-panel">
      <span className="flex items-center">
        {isAccounts && accountsToDisable.length > 0 && (
          <>
            <p className="text-sm">
              Accounts selected: <strong>{accountsToDisable.length}</strong>
            </p>
            {accounts.length !== accountIdsToDisable.length ? (
              <>
                <button
                  type="button"
                  className="btn-clear ml-2 px-2"
                  onClick={selectAllAccounts}
                >
                  Select all?
                </button>
                <button
                  type="button"
                  className="btn-clear ml-2 px-2"
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
                    className="btn-clear ml-2 px-2"
                    onClick={deselectAllAccounts}
                  >
                    Deselect all?
                  </button>
                )}
              </>
            )}
          </>
        )}
        {isSites && (
          <>
            <button
              type="button"
              className="btn-clear mr-1"
              onClick={handleDeactivate}
            >
              Deactivate
            </button>
            <button type="button" className="btn-primary" onClick={onActivate}>
              Activate
            </button>
          </>
        )}
      </span>

      {isSites && sitesToDisable.length > 0 && (
        <span className="flex items-center">
          <p className="text-sm">
            Sites selected: <strong>{sitesToDisable.length}</strong>
          </p>
          {sites.length !== siteIdsToDisable.length ? (
            <>
              <button
                type="button"
                className="btn-clear ml-2 px-2"
                onClick={selectAllSites}
              >
                Select all?
              </button>
              <button
                type="button"
                className="btn-clear ml-2 px-2"
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

      {process.env.REACT_APP_ENABLE_PAGINATION_SIZE === 'true' && (
        <span className="text-sm">
          Show
          <select
            className="mx-1 cursor-pointer"
            value={pageSize}
            onChange={onPageSizeChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          per page
        </span>
      )}

      <div className="pagination">
        <button
          className="paging-button"
          onClick={() => onBtnFirst()}
          disabled={isFirstPage}
        >
          <Icon iconName={faAngleDoubleLeft} />
        </button>
        <button
          className="paging-button"
          onClick={() => onBtnPrevious()}
          disabled={isFirstPage}
        >
          <Icon iconName={faAngleLeft} />
        </button>
        <CalculateCurrentView
          pageIndex={currentPage - 1}
          pageSize={pageSize}
          rows={rowCount}
        />
        <button
          className="paging-button"
          onClick={() => onBtnNext()}
          disabled={isLastPage}
        >
          <Icon iconName={faAngleRight} />
        </button>
        <button
          className="paging-button"
          onClick={() => onBtnLast()}
          disabled={isLastPage}
        >
          <Icon iconName={faAngleDoubleRight} />
        </button>
      </div>
      <Modal
        show={showModal}
        title="Are you sure?"
        modalClassName="max-w-lg my-12"
        confirmButtonText="Yes, disable them"
        closeButtonText="No, keep them"
        handleClose={() => {
          setShowModal(false);
        }}
        confirmationAction={() => {
          onDeactivate();
          setShowModal(false);
        }}
      >
        <p className="p-16 text-center">
          Disabling these sites will make it unavailable to users in the
          RapidTest app
        </p>
      </Modal>
    </div>
  );
};

export default Pagination;
