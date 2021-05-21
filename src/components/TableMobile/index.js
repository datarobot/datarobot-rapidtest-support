import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import Loading from 'components/Loading';
import Pagination from 'components/TableAdvancedV2/Pagination';

import HeaderCell from './HeaderCell';
// import FloatingFilter from './FloatingFilter';
import LoadingOverlay from '../TableAdvancedV2/LoadingOverlay';
import Selector from '../TableAdvancedV2/Selector';

import './TableMobile.css';

const TableMobile = ({
  rows,
  cols,
  cellRenderer,
  defaultSortCol,
  tableName,
  isLoading,
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);

  // const { pathname } = useLocation();
  // const isAccounts = pathname.includes('/accounts');

  useEffect(() => {
    if (gridApi && isLoading) {
      gridApi.showLoadingOverlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (columnApi && defaultSortCol) {
      columnApi.getColumn(defaultSortCol).setSort('asc');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnApi]);

  const onGridReady = async (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  // eslint-disable-next-line no-unused-vars
  const handleFilterChange = ({ target }) => {
    gridApi.setQuickFilter(target.value);
  };

  const onPaginationChanged = () => {
    if (gridApi) {
      setCurrentPage(gridApi.paginationGetCurrentPage() + 1);
      setTotalPages(gridApi.paginationGetTotalPages());
      setRowCount(gridApi.paginationGetRowCount());
      setIsLastPage(
        gridApi.paginationGetCurrentPage() + 1 ===
          gridApi.paginationGetTotalPages()
      );
      setIsFirstPage(gridApi.paginationGetCurrentPage() === 0);
    }
  };

  const handlePageSizeChange = ({ target }) => {
    const { value } = target;
    setPageSize(parseInt(value, 10));
    gridApi.paginationSetPageSize(parseInt(value, 10));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="TableMobile">
      <h3>{tableName}</h3>

      <div className="ag-theme-rt-v2">
        <Selector gridApi={gridApi} pageSize={pageSize} />
        <AgGridReact
          onGridReady={onGridReady}
          rowData={isLoading ? null : rows}
          domLayout={'autoHeight'}
          rowHeight={220 + 24}
          headerHeight={45}
          // floatingFiltersHeight={50}
          defaultColDef={{
            flex: 1,
            sortable: true,
            resizable: true,
            filter: true,
            headerComponentParams: { showCheck: false },
          }}
          pagination={true}
          paginationPageSize={pageSize}
          onPaginationChanged={onPaginationChanged}
          suppressPaginationPanel={true}
          frameworkComponents={{
            agColumnHeader: HeaderCell,
            loadingOverlay: LoadingOverlay,
            // floatingFilter: FloatingFilter,
            cellRenderer,
            // ...renderers,
          }}
          fullWidthCellRenderer="cellRenderer"
          isFullWidthCell={() => true}
          animateRows={true}
          loadingOverlayComponent={'loadingOverlay'}
          overlayNoRowsTemplate={'<span class="p-12">No data found.</span>'}
        >
          {cols.map(
            (
              {
                colId,
                colWidth,
                comparator,
                disableSort,
                field,
                header,
                headerParams,
                renderer,
                resizable = true,
                value,
              },
              i
            ) => (
              <AgGridColumn
                key={i}
                sortable={!disableSort}
                filter={true}
                // floatingFilter={i === 0}
                // floatingFilterComponent="floatingFilter"
                field={field || null}
                resizable={resizable}
                valueGetter={value || null}
                headerName={header}
                cellRenderer={renderer}
                flex={i === 0 ? 1 : undefined}
                maxWidth={i === 0 ? undefined : 0}
                comparator={comparator}
                headerComponentParams={headerParams}
                colId={colId}
              />
            )
          )}
        </AgGridReact>
      </div>

      <div className="pagination-panel limitWidth">
        <Pagination
          currentPage={currentPage}
          gridApi={gridApi}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          totalPages={totalPages}
          pageSize={pageSize}
          rowCount={rowCount}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default TableMobile;
