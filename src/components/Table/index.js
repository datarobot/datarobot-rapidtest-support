// @ts-nocheck
import React, { useState } from 'react';
import cls from 'classnames';
import { useTable, useFilters, useSortBy } from 'react-table';

import Icon from 'components/Icon';
import Input from 'components/Input';

const Table = ({ columns, data }) => {
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
      <div className="w-1/2 my-6">
        <Input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Search..."
          rounded
        />
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
                      // eslint-disable-next-line no-nested-ternary
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

// <table {...getTableProps()}>
//           <thead>
//             {
//               // Loop over the header rows
//               headerGroups.map((headerGroup) => (
//                 // Apply the header row props
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                   {
//                     // Loop over the headers in each row
//                     headerGroup.headers.map((column) => (
//                       // Apply the header cell props
//                       <th {...column.getHeaderProps()}>
//                         {
//                           // Render the header
//                           column.render('Header')
//                         }
//                       </th>
//                     ))
//                   }
//                 </tr>
//               ))
//             }
//           </thead>
//           <tbody>
//             <tr>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
