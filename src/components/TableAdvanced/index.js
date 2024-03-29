// @ts-nocheck
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import cls from 'classnames';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons/faUserTimes';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import Input from 'components/Input';
import Radio from 'components/Radio';
import HeaderCell from 'components/TableAdvanced/HeaderCell';
import LoadingOverlay from 'components/TableAdvanced/LoadingOverlay';
import Pagination from 'components/TableAdvanced/Pagination';
import useCurrentProgram from 'hooks/useCurrentProgram';

import 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import './TableAdvanced.css';

const TableAdvanced = ({
  rows,
  cols,
  renderers,
  onFilter,
  onFilterReset,
  defaultSortCol,
  addButtonText,
  addButtonIcon,
  uploadButtonText,
  tableName,
  addRoute,
  uploadRoute,
  tableOnly = false,
  onExportData,
  isLoading = false,
  onActivate,
  onDeactivate,
  showResendEmail,
  showActivate,
  showDeactivate,
  handleResendEmail,
}) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { name: currentProgram } = useCurrentProgram();

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

  const handleUploadClick = () => history.push(uploadRoute);
  const handleAddClick = () => history.push(addRoute);

  return (
    <>
      {!tableOnly && (
        <>
          {tableName && (
            <h1 className="headline text-blue mb-4">{tableName}</h1>
          )}
          <div className="grid grid-cols-2 lg:mb-4 xl:mb-4 mt-2">
            <div className="flex flex-col justify-center">
              <div className="flex items-center">
                {!isFilterFocused && (
                  <>
                    <Icon iconName={faSearch} />
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
                          <Icon iconName={faFilter} className="mr-2" />
                          <span className="text-gray-400">Filter</span>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="btn-clear px-2 py-0 border-0"
                          onClick={onFilterReset}
                        >
                          <Icon iconName={faTimes} className="mx-2" />
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
                {!isSearchFocused && !isFilterFocused && (
                  <span className="w-full truncate">
                    Your program: <strong>{currentProgram}</strong>
                  </span>
                )}
              </div>
            </div>

            <div className="table-buttons flex justify-end items-center">
              {isAccounts && (
                <>
                  {showResendEmail && (
                    <IconButton
                      label="Re-send email"
                      className="px-2"
                      icon={faEnvelope}
                      onClick={handleResendEmail}
                    />
                  )}

                  {showDeactivate && (
                    <IconButton
                      label="Deactivate user(s)"
                      className="px-2"
                      icon={faUserTimes}
                      onClick={onDeactivate}
                    />
                  )}

                  {showActivate && (
                    <IconButton
                      label="Activate user(s)"
                      className="pl-2 pr-1"
                      icon={faUserCheck}
                      onClick={onActivate}
                    />
                  )}
                </>
              )}
              <span
                className={cls('flex', {
                  'ml-1 pl-1': isAccounts,
                  'border-l': showResendEmail || showActivate || showDeactivate,
                })}
              >
                <IconButton
                  label={uploadButtonText}
                  className="px-2"
                  icon={faUpload}
                  onClick={handleUploadClick}
                />

                <IconButton
                  label="Export data"
                  className="px-2"
                  icon={faFileExport}
                  onClick={onExportData}
                />

                <IconButton
                  label={addButtonText}
                  className="px-2"
                  icon={addButtonIcon}
                  onClick={handleAddClick}
                />
              </span>
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
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </>
  );
};

export default TableAdvanced;
