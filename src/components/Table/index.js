// @ts-nocheck
import React, { useState } from 'react';
import cls from 'classnames';
import { useTable, useFilters, useSortBy } from 'react-table';

import Icon from 'components/Icon';
import Input from 'components/Input';

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
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

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
                      {!isSorted && <Icon iconName="sort" />}
                      {isSorted && !isSortedDesc && <Icon iconName="sort-up" />}
                      {isSortedDesc && <Icon iconName="sort-down" />}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
    </>
  );
};

export default Table;
