/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import Button, { KIND } from 'components/Button';
import Icon from 'components/Icon';
import HeaderCell from 'components/Table2/HeaderCell';

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
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <>
      {!tableOnly && (
        <div className="grid grid-cols-2 my-6">
          <div className="flex flex-0 flex-col justify-center">
            {tableName && (
              <h1 className="headline text-blue mb-4">{tableName}</h1>
            )}
            {/* <div className="flex items-center">
              <Icon iconName="search" type="fal" />
              <Input
                value={filterInput || ''}
                onChange={handleFilterChange}
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={cls('self-center search', {
                  'rounded-r-none': !searchFocused,
                })}
              />
            </div> */}
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
      <div style={{ width: '100%', height: '100%', marginBottom: 80 }}>
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
              // resizable: true,
              filter: true,
            }}
            pagination={true}
            paginationPageSize={10}
            frameworkComponents={{ agColumnHeader: HeaderCell, ...renderers }}
          >
            {cols.map(
              ({ colWidth, disableSort, field, header, renderer, value }) => (
                <AgGridColumn
                  key={header}
                  sortable={!disableSort}
                  filter={true}
                  field={field || null}
                  valueGetter={value || null}
                  headerName={header}
                  cellRenderer={renderer}
                  maxWidth={colWidth}
                />
              )
            )}
          </AgGridReact>
        </div>
      </div>
    </>
  );
};

export default Table2;
