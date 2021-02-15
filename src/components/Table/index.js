/* eslint-disable no-param-reassign */
// @ts-nocheck
import React, { useState } from 'react';
import cls from 'classnames';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';

import Icon from 'components/Icon';
import Input from 'components/Input';

import './Table.css';

const Table = ({
  columns,
  data,
  addButtonText,
  uploadButtonText,
  onAddClick,
  onUploadClick,
}) => {
  const [filterInput, setFilterInput] = useState('');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setFilter,
    rows,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const pageButtons = [];

  const getPagingRange = (
    current = pageIndex,
    { min = 1, total = rows.length, length = pageCount } = {}
  ) => {
    if (length > total) {
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
        className={cls('px-4', {
          'btn-clear': i !== pageIndex,
          'btn-primary': i === pageIndex,
        })}
        onClick={() => gotoPage(i)}
      >
        {i + 1}
      </button>
    );
  }

  const calculateCurrentView = () => {
    const offset = pageIndex * pageSize + 1;
    const totalOffset =
      offset < rows.length ? (pageIndex + 1) * pageSize : rows.length;
    return `Showing ${offset} to ${totalOffset} of ${rows.length} entries`;
  };

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter('name', value);
    setFilterInput(value);
  };

  return (
    <>
      <div className="grid grid-cols-2 my-6">
        <div className="flex flex-0 justify-center">
          <Input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder="Search..."
            className="self-center"
            rounded
          />
        </div>
        <div className="table-buttons flex flex-col items-end">
          <button
            className="btn-clear text-dark-blue uppercase"
            onClick={onAddClick}
          >
            {addButtonText}
          </button>
          <button
            className="btn-clear text-dark-blue uppercase"
            onClick={onUploadClick}
          >
            {uploadButtonText}
          </button>
        </div>
      </div>
      <table {...getTableProps()} className="border-collapse w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const { isSorted, isSortedDesc } = column;

                return (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={cls(
                      'p-2 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell',
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
                          {!isSorted && <Icon iconName="sort" />}
                          {isSorted && !isSortedDesc && (
                            <Icon iconName="sort-up" />
                          )}
                          {isSortedDesc && <Icon iconName="sort-down" />}
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
                    className="w-full lg:w-auto p-3 text-gray-800 border border-b block lg:table-cell relative lg:static"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows.length > pageSize && (
        <div className="pagination">
          <div className="w-full flex justify-between">
            <span className="text-gray-500">{calculateCurrentView()}</span>{' '}
            <span>
              <button
                className="btn-clear px-4"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {'<<'}
              </button>
              <button
                className="btn-clear px-4"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <span>{pageButtons}</span>
              <button
                className="btn-clear px-4"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
              <button
                className="btn-clear px-4"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {'>>'}
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
