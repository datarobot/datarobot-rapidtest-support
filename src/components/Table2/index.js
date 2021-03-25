// @ts-nocheck
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import cls from 'classnames';

import Button, { KIND } from 'components/Button';
import Icon from 'components/Icon';
import Input from 'components/Input';
import HeaderCell from 'components/Table2/HeaderCell';
import LoadingOverlay from 'components/Table2/LoadingOverlay';
import Pagination from 'components/Table2/Pagination';

import 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import './Table2.css';

const Table2 = ({
  rows,
  cols,
  renderers,
  addButtonText,
  uploadButtonText,
  tableName,
  addRoute,
  uploadRoute,
  tableOnly = false,
  onExportData,
  isLoading = false,
  onActivate,
  onDeactivate,
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);

  useEffect(() => {
    if (gridApi && isLoading) {
      gridApi.showLoadingOverlay();
    }
  }, [isLoading]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleFilterChange = (event) => {
    gridApi.setQuickFilter(event.target.value);
  };

  const onPaginationChanged = () => {
    if (gridApi) {
      // setText('#lbPageSize', gridApi.paginationGetPageSize());
      setCurrentPage(gridApi.paginationGetCurrentPage() + 1);
      setTotalPages(gridApi.paginationGetTotalPages());
      setPageSize(gridApi.paginationGetPageSize());
      setRowCount(gridApi.paginationGetRowCount());
      setIsLastPage(
        gridApi.paginationGetCurrentPage() + 1 ===
          gridApi.paginationGetTotalPages()
      );
      setIsFirstPage(gridApi.paginationGetCurrentPage() === 0);
    }
  };

  return (
    <>
      {!tableOnly && (
        <div className="grid grid-cols-2 my-6">
          <div className="flex flex-0 flex-col justify-center">
            {tableName && (
              <h1 className="headline text-blue mb-4">{tableName}</h1>
            )}
            <div className="flex items-center">
              <Icon iconName="search" type="fal" />
              <Input
                onChange={handleFilterChange}
                placeholder="Search..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cls('self-center search', {
                  'rounded-r-none': !isSearchFocused,
                })}
              />
            </div>
          </div>
          <div className="table-buttons flex justify-end items-center">
            <Link to={uploadRoute} className="btn-clear text-blue mr-1 px-2">
              {uploadButtonText}
            </Link>
            <Button
              kind={KIND.CLEAR}
              label="Export data"
              className="mr-3 px-2"
              icon={<Icon iconName="file-export" type="fal" />}
              onClick={onExportData}
            />
            <Link to={addRoute} className="btn-primary px-2">
              {addButtonText}
            </Link>
          </div>
        </div>
      )}
      <div style={{ height: '100%', width: '100%' }}>
        <div className="ag-theme-rt" style={{ height: '100%', width: '100%' }}>
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
            paginationPageSize={10}
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
            onActivate={onActivate}
            onDeactivate={onDeactivate}
          />
        </div>
      </div>
    </>
  );
};

export default Table2;
