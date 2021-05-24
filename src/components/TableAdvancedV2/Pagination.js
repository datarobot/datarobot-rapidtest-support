/* eslint-disable no-unused-vars */
// @ts-nocheck
import Icon from 'components/Icon';

const CalculateCurrentView = ({ pageIndex, pageSize, rows }) => {
  const offset = pageIndex * pageSize + 1;
  const totalOffset =
    (pageIndex + 1) * pageSize < rows ? (pageIndex + 1) * pageSize : rows;
  const totalEntries = rows;

  return (
    <p className="paging-text">
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
  onPageSizeChange = () => {},
  // totalPages,
}) => (
  <>
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
        onClick={() => gridApi.paginationGoToFirstPage()}
        disabled={isFirstPage}
      >
        <Icon iconName="angle-double-left" type="fal" />
      </button>
      <button
        className="paging-button"
        onClick={() => gridApi.paginationGoToPreviousPage()}
        disabled={isFirstPage}
      >
        <Icon iconName="angle-left" type="fal" />
      </button>
      <CalculateCurrentView
        pageIndex={currentPage - 1}
        pageSize={pageSize}
        rows={rowCount}
      />
      <button
        className="paging-button"
        onClick={() => gridApi.paginationGoToNextPage()}
        disabled={isLastPage}
      >
        <Icon iconName="angle-right" type="fal" />
      </button>
      <button
        className="paging-button"
        onClick={() => gridApi.paginationGoToLastPage()}
        disabled={isLastPage}
      >
        <Icon iconName="angle-double-right" type="fal" />
      </button>
    </div>
  </>
);

export default Pagination;
