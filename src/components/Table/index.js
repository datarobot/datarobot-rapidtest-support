// @ts-nocheck
import { useState } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';

import Button, { KIND } from 'components/Button';
import Empty from 'components/Table/Empty';
import Icon from 'components/Icon';
import Input from 'components/Input';
import Pagination from 'components/Table/Pagination';

import './Table.css';

const Table = ({
  columns = [],
  data,
  addButtonText,
  uploadButtonText,
  tableName,
  addRoute,
  uploadRoute,
  columnFilter = 'name',
  sortBy,
  tableOnly = false,
  isLoading,
  onExportData,
}) => {
  const [filterInput, setFilterInput] = useState('');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setFilter,
    rows,
    page,
    pageCount,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, sortBy: [{ id: sortBy }] },
      autoResetPage: false,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const [searchFocused, setSearchFocused] = useState(false);

  const pageButtons = [];

  const getPagingRange = (
    current = pageIndex,
    { min = 1, total = rows.length, length = pageCount } = {}
  ) => {
    if (length > total) {
      // eslint-disable-next-line no-param-reassign
      length = total;
    }

    let start = current - Math.floor(length / 2);
    start = Math.max(start, min);
    start = Math.min(start, min + total - length);

    return Array.from({ length }, (el, i) => start + i);
  };

  for (let i = 0; i < getPagingRange().length; i += 1) {
    pageButtons.push(
      <button
        key={i}
        className={cls('px-2 cursor-pointer font-bold', {
          'text-blue': i === pageIndex,
        })}
        onClick={() => gotoPage(i)}
      >
        {i + 1}
      </button>
    );
  }

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(columnFilter, value);
    setFilterInput(value);
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
              <Icon iconName={faSearch} />
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
              icon={<Icon iconName={faFileExport} />}
              onClick={onExportData}
            />
            <Link to={addRoute} className="btn-primary px-2">
              {addButtonText}
            </Link>
          </div>
        </div>
      )}
      <div className="tableWrapper">
        {page.length === 0 || isLoading ? (
          <Empty isLoading={isLoading} />
        ) : (
          <table {...getTableProps()} className="table border-collapse w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    const { isSorted, isSortedDesc } = column;

                    return (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className={cls(
                          'p-2 font-bold text-left text-sm uppercase border-b border-gray-400 text-gray-500 hidden lg:table-cell',
                          {
                            'sort-asc': isSorted,
                            'sorted-desc': isSortedDesc,
                          }
                        )}
                      >
                        <div className="w-full flex justify-between">
                          {column.render('Header')}
                          {typeof column.Header === 'string' && (
                            <>
                              {!isSorted && <Icon iconName={faSort} />}
                              {isSorted && !isSortedDesc && (
                                <Icon iconName={faSortUp} />
                              )}
                              {isSortedDesc && <Icon iconName={faSortDown} />}
                            </>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="lg:w-auto p-2 text-gray-800 border-b border-gray-400 block lg:table-cell relative lg:static"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {rows.length > pageSize && !tableOnly && (
        <Pagination
          gotoPage={gotoPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          rows={rows}
        />
      )}
    </>
  );
};

export default Table;
