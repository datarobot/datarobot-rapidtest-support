// @ts-nocheck
import Icon from 'components/Icon';

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
  // totalPages,
}) => {
  const onBtnFirst = () => gridApi.paginationGoToFirstPage();
  const onBtnLast = () => gridApi.paginationGoToLastPage();
  const onBtnNext = () => gridApi.paginationGoToNextPage();
  const onBtnPrevious = () => gridApi.paginationGoToPreviousPage();

  return (
    <div className="pagination-panel flex justify-between">
      <span>
        <button type="button" className="btn-clear mr-1" onClick={onDeactivate}>
          Deactivate
        </button>
        <button type="button" className="btn-primary" onClick={onActivate}>
          Activate
        </button>
      </span>

      <div className="flex items-center justify-center">
        <button
          className="paging-button"
          onClick={() => onBtnFirst()}
          disabled={isFirstPage}
        >
          <Icon iconName="chevron-double-left" type="fal" />
        </button>
        <button
          className="paging-button"
          onClick={() => onBtnPrevious()}
          disabled={isFirstPage}
        >
          <Icon iconName="chevron-left" type="fal" />
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
          <Icon iconName="chevron-right" type="fal" />
        </button>
        <button
          className="paging-button"
          onClick={() => onBtnLast()}
          disabled={isLastPage}
        >
          <Icon iconName="chevron-double-right" type="fal" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
