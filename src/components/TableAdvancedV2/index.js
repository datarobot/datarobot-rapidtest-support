// @ts-nocheck
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import cls from 'classnames';

import Icon from 'components/Icon';
import Input from 'components/Input';
import Radio from 'components/Radio';
import HeaderCell from 'components/TableAdvancedV2/HeaderCell';
import LoadingOverlay from 'components/TableAdvancedV2/LoadingOverlay';
import Pagination from 'components/TableAdvancedV2/Pagination';

import 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import './TableAdvancedV2.css';

const TableAdvancedV2 = ({
  rows,
  cols,
  renderers,
  onFilter,
  onFilterReset,
  defaultSortCol,
  tableName,
  tableOnly = false,
  isLoading = false,
  tableButtons,
}) => {
  const { pathname } = useLocation();

  const [gridApi, setGridApi] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterFocused, setIsFilterFocused] = useState(false);
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
          {tableName && <h1 className="mb-4">{tableName}</h1>}
          <div className="grid grid-cols-2 lg:mb-4 xl:mb-4 mt-2">
            <div className="flex flex-col justify-center">
              <div className="flex items-center">
                {!isFilterFocused && (
                  <>
                    <Icon iconName="search" type="fal" />
                    <Input
                      onChange={handleFilterChange}
                      placeholder="Search"
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      isSearch
                      wrapperClass={cls({
                        'w-3/5': isSearchFocused,
                      })}
                      className={cls('self-center search', {
                        'rounded-r-none': !isSearchFocused,
                      })}
                    />
                  </>
                )}
                {!isSearchFocused && isAccounts && (
                  <>
                    <span
                      style={{ minHeight: 42 }}
                      className={cls(
                        'flex mr-8 border-gray-300 py-2 cursor-pointer',
                        { 'pr-6 border-r': !isFilterFocused }
                      )}
                      onClick={() => setIsFilterFocused(!isFilterFocused)}
                    >
                      {!isFilterFocused ? (
                        <>
                          <Icon iconName="filter" type="fal" className="mr-2" />
                          <span className="text-gray-400">Filter</span>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="btn-clear px-2 py-0 border-0"
                          onClick={onFilterReset}
                        >
                          <Icon iconName="times" type="fal" className="mx-2" />
                        </button>
                      )}
                    </span>

                    {isFilterFocused && (
                      <Radio
                        wrapperClass="flex"
                        name="table-filter"
                        values={[
                          { label: 'Active', value: 'active' },
                          { label: 'Inactive', value: 'inactive' },
                          { label: 'Pending', value: 'pending' },
                        ]}
                        onChange={onFilter}
                      />
                    )}
                  </>
                )}
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
            rowData={rows}
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
    </>
  );
};

export default TableAdvancedV2;
