// @ts-nocheck
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import Select from 'react-select';

import { accountFilterAtom } from 'rt-store';

import Input from 'components/Input';
import HeaderCell from 'components/TableAdvancedV2/HeaderCell';
import LoadingOverlay from 'components/TableAdvancedV2/LoadingOverlay';
import Selector from 'components/TableAdvancedV2/Selector';
import Pagination from 'components/TableAdvancedV2/Pagination';

import 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import './TableAdvancedV2.css';

const AccountFilter = () => {
  const [, setAccountFilter] = useAtom(accountFilterAtom);

  return (
    <Select
      className="Filter ml-4"
      classNamePrefix="Filter"
      placeholder="Filter"
      // menuIsOpen={true}
      isClearable={true}
      isSearchable={false}
      options={[
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ]}
      onChange={(newValue) => {
        setAccountFilter(newValue?.value);
      }}
    />
  );
};

const TableAdvancedV2 = ({
  rows,
  cols,
  renderers,
  defaultSortCol,
  tableName,
  tableOnly = false,
  isLoading = false,
  tableButtons,
}) => {
  const { pathname } = useLocation();

  const [gridApi, setGridApi] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [columnApi, setColumnApi] = useState();

  const isAccounts = pathname.includes('/accounts');

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

  return (
    <>
      {!tableOnly && (
        <>
          {tableName && <h2 className="mb-4">{tableName}</h2>}
          <div className="grid grid-cols-2 lg:mb-4 xl:mb-4 mt-2">
            <div className="flex flex-col justify-center">
              <div className="flex items-center">
                <Input
                  v2
                  onChange={handleFilterChange}
                  placeholder="Search"
                  icon="search"
                  isSearch
                  className="self-center"
                />
                {isAccounts && <AccountFilter />}
              </div>
            </div>

            <div className="table-buttons flex justify-end items-center">
              {tableButtons}
            </div>
          </div>
        </>
      )}
      <div style={{ height: '100%', width: '100%', marginBottom: '8rem' }}>
        <div
          className="ag-theme-rt-v2"
          style={{ height: '100%', width: '100%' }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            rowData={isLoading ? null : rows}
            domLayout={'autoHeight'}
            rowHeight={40}
            headerHeight={45}
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
              ...renderers,
            }}
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
                  field={field || null}
                  resizable={resizable}
                  valueGetter={value || null}
                  headerName={header}
                  cellRenderer={renderer}
                  maxWidth={colWidth}
                  comparator={comparator}
                  headerComponentParams={headerParams}
                  colId={colId}
                />
              )
            )}
          </AgGridReact>
          {currentPage > 0 && (
            <div className="pagination-panel limitWidth">
              <Selector gridApi={gridApi} pageSize={pageSize} />
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
          )}
        </div>
      </div>
    </>
  );
};

export default TableAdvancedV2;
