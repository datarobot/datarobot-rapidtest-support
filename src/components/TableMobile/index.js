import { useEffect, useState } from 'react';

import Loading from 'components/Loading';
import Pagination from 'components/TableAdvancedV2/Pagination';

import './TableMobile.css';

const TableMobile = ({ rows, defaultSortCol, tableName, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setRowCount(rows.length);
    setTotalPages(Math.ceil(rows.length / pageSize));
  }, [rows]);

  useEffect(() => {
    setIsLastPage(currentPage === totalPages);
    setIsFirstPage(currentPage === 1);
  }, [currentPage, totalPages]);

  const currentRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) return <Loading />;

  return (
    <div className="TableMobile">
      <h3>{tableName}</h3>
      {currentRows.map(({ id }) => {
        return <p key={id}>{id}</p>;
      })}
      <div className="pagination-panel limitWidth">
        <Pagination
          currentPage={currentPage}
          gridApi={{
            paginationGoToFirstPage: () => setCurrentPage(1),
            paginationGoToPreviousPage: () => setCurrentPage(currentPage - 1),
            paginationGoToNextPage: () => setCurrentPage(currentPage + 1),
            paginationGoToLastPage: () => setCurrentPage(totalPages),
          }}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          totalPages={totalPages}
          pageSize={pageSize}
          rowCount={rowCount}
        />
      </div>
    </div>
  );
};

export default TableMobile;
