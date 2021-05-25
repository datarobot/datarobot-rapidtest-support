import Select from 'react-select';

const AccountsSort = ({ columnApi }) => {
  const onChange = (newValue) => {
    const state = [newValue?.value || { colId: 'name', sort: 'asc' }];
    columnApi.applyColumnState({
      state,
      defaultState: { sort: null },
    });
  };

  return (
    <Select
      className="Filter small ml-4 flex-1"
      classNamePrefix="Filter"
      placeholder="Sort"
      isClearable={true}
      isSearchable={false}
      options={[
        {
          options: [
            { label: 'Name (A-Z)', value: { colId: 'name', sort: 'asc' } },
            { label: 'Name (Z-A)', value: { colId: 'name', sort: 'desc' } },
          ],
        },
        {
          options: [
            { label: 'Email (A-Z)', value: { colId: 'email', sort: 'asc' } },
            { label: 'Email (Z-A)', value: { colId: 'email', sort: 'desc' } },
          ],
        },
        {
          options: [
            { label: 'Added (A-Z)', value: { colId: 'added', sort: 'asc' } },
            {
              label: 'Added (Z-A)',
              value: { colId: 'added', sort: 'desc' },
            },
          ],
        },
        {
          options: [
            { label: 'Status (A-Z)', value: { colId: 'status', sort: 'asc' } },
            { label: 'Status (Z-A)', value: { colId: 'status', sort: 'desc' } },
          ],
        },
      ]}
      onChange={onChange}
    />
  );
};

export default AccountsSort;
