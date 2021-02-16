// @ts-nocheck
import React from 'react';
import { Trans } from 'react-i18next';

import Icon from 'components/Icon';

const CalculateCurrentView = ({ pageIndex, pageSize, rows }) => {
  const offset = pageIndex * pageSize + 1;
  const totalOffset =
    offset < rows.length ? (pageIndex + 1) * pageSize : rows.length;
  const totalEntries = rows.length;

  return (
    <Trans
      i18nKey="pagination.showingEntries"
      offset={offset}
      total={totalOffset}
      totalEntries={totalEntries}
    >
      Showing {{ offset }} to {{ totalOffset }} of {{ totalEntries }} entries
    </Trans>
  );
};

const Pagination = ({
  canNextPage,
  canPreviousPage,
  gotoPage,
  nextPage,
  pageButtons,
  pageCount,
  pageIndex,
  pageSize,
  previousPage,
  rows,
}) => (
  <div className="pagination">
    <div className="w-full flex justify-between">
      <span className="text-gray-500">
        <CalculateCurrentView
          pageIndex={pageIndex}
          pageSize={pageSize}
          rows={rows}
        />
      </span>{' '}
      <span className="pagingButtons">
        <button
          className="pagingButton"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <Icon iconName="chevron-double-left" size="sm" />
        </button>
        <button
          className="pagingButton"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <Icon iconName="chevron-left" size="sm" />
        </button>
        <span>{pageButtons}</span>
        <button
          className="pagingButton"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <Icon iconName="chevron-right" size="sm" />
        </button>
        <button
          className="pagingButton"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <Icon iconName="chevron-double-right" size="sm" />
        </button>
      </span>
    </div>
  </div>
);

export default Pagination;
