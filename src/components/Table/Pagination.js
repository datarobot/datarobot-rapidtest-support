// @ts-nocheck
import React from 'react';
import { Trans } from 'react-i18next';
import ReactPaginate from 'react-paginate';

import Icon from 'components/Icon';

const CalculateCurrentView = ({ pageIndex, pageSize, rows }) => {
  const offset = pageIndex * pageSize + 1;
  const totalOffset =
    (pageIndex + 1) * pageSize < rows.length
      ? (pageIndex + 1) * pageSize
      : rows.length;
  const totalEntries = rows.length;

  return (
    <Trans
      i18nKey="pagination.showingEntries"
      offset={offset}
      total={totalOffset}
      totalEntries={totalEntries}
    >
      {{ offset }} - {{ totalOffset }} of {{ totalEntries }}
    </Trans>
  );
};

const Pagination = ({ gotoPage, pageCount, pageIndex, pageSize, rows }) => {
  const handlePageClick = (d) => {
    gotoPage(d.selected);
  };

  return (
    <div className="paginationWrapper">
      <span className="text-gray-500 text-sm font-bold">
        <CalculateCurrentView
          pageIndex={pageIndex}
          pageSize={pageSize}
          rows={rows}
        />
      </span>
      <ReactPaginate
        previousLabel={<Icon iconName="chevron-left" size="sm" />}
        nextLabel={<Icon iconName="chevron-right" size="sm" />}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Pagination;
