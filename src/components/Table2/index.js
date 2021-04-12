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

import { get } from 'utils';
import { getPrograms } from 'services/api';

import 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import './Table2.css';

const Table2 = ({
  rows,
  cols,
  renderers,
  defaultSortCol,
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
  const [pageSize, setPageSize] = useState(50);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [currentProgram, setCurrentProgram] = useState('');
  const [columnApi, setColumnApi] = useState();

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
    const programs = await getPrograms();

    setCurrentProgram(programs[get('program')][0].name);
  };

  const handleFilterChange = (event) => {
    gridApi.setQuickFilter(event.target.value);
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
          {tableName && (
            <h1 className="headline text-blue mb-4">{tableName}</h1>
          )}
          <div className="grid grid-cols-3 lg:mb-4 xl:mb-4 mt-2">
            <div className="flex flex-0 flex-col justify-center col-span-2">
              <div className="flex items-center">
                <Icon iconName="search" type="fal" />
                <Input
                  onChange={handleFilterChange}
                  placeholder="Search..."
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
                {!isSearchFocused && (
                  <span className="w-full truncate">
                    Your program: <strong>{currentProgram}</strong>
                  </span>
                )}
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
        </>
      )}
      <div style={{ height: '100%', width: '100%', marginBottom: '6.5rem' }}>
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
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </>
  );
};

export default Table2;
