import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import { quickFilterAtom } from 'rt-store';

import Loading from 'components/Loading';
import Pagination from 'components/TableAdvancedV2/Pagination';
import LoadingOverlay from 'components/TableAdvancedV2/LoadingOverlay';
import Selector from 'components/TableAdvancedV2/Selector';

import Header from './Header';

import './TableMobile.css';

const TableMobile = ({
  rows,
  cols,
  cellRenderer,
  tableName,
  isLoading,
  handleCheckChange,
  tableButtons,
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState();
  const [, setQuickFilter] = useAtom(quickFilterAtom);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);

  useEffect(() => {
    if (gridApi && isLoading) {
      gridApi.showLoadingOverlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onGridReady = async (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  // eslint-disable-next-line no-unused-vars
  const handleFilterChange = ({ target }) => {
    const value = target?.value || null;
    setQuickFilter(value?.split(' '));
    gridApi.setQuickFilter(value);
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
        <Header
          gridApi={gridApi}
          columnApi={columnApi}
          handleCheckChange={handleCheckChange}
          handleFilterChange={handleFilterChange}
          tableButtons={tableButtons}
        />
        <Selector gridApi={gridApi} pageSize={pageSize} />
        <AgGridReact
          onGridReady={onGridReady}
          rowData={isLoading ? null : rows}
          domLayout={'autoHeight'}
          rowHeight={220 + 16}
          headerHeight={0}
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
            loadingOverlay: LoadingOverlay,
            cellRenderer,
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
                initialSort,
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
                field={field || null}
                resizable={resizable}
                valueGetter={value || null}
                headerName={header}
                cellRenderer={renderer}
                flex={i === 0 ? 1 : undefined}
                maxWidth={i === 0 ? undefined : 0}
                comparator={comparator}
                initialSort={initialSort}
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
