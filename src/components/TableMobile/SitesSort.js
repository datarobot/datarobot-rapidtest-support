import Select from 'react-select';

const SitesSort = ({ columnApi }) => {
  const onChange = (newValue) => {
    const state = [newValue?.value || { colId: 'siteName', sort: 'asc' }];
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
            { label: 'Name (A-Z)', value: { colId: 'siteName', sort: 'asc' } },
            { label: 'Name (Z-A)', value: { colId: 'siteName', sort: 'desc' } },
          ],
        },
        {
          options: [
            {
              label: 'Address (A-Z)',
              value: { colId: 'address', sort: 'asc' },
            },
            {
              label: 'Address (Z-A)',
              value: { colId: 'address', sort: 'desc' },
            },
          ],
        },
        {
          options: [
            {
              label: 'District (A-Z)',
              value: { colId: 'district', sort: 'asc' },
            },
            {
              label: 'District (Z-A)',
              value: { colId: 'district', sort: 'desc' },
            },
          ],
        },
        {
          options: [
            {
              label: 'Contact (A-Z)',
              value: { colId: 'contact', sort: 'asc' },
            },
            {
              label: 'Contact (Z-A)',
              value: { colId: 'contact', sort: 'desc' },
            },
          ],
        },
      ]}
      onChange={onChange}
    />
  );
};

export default SitesSort;
