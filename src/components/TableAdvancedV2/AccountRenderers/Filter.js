import { useAtom } from 'jotai';
import Select from 'react-select';
import cls from 'classnames';

import { accountFilterAtom } from 'rt-store';

const AccountFilter = ({ small }) => {
  const [, setAccountFilter] = useAtom(accountFilterAtom);

  return (
    <Select
      className={cls('Filter ml-4', { small, 'flex-1': small })}
      classNamePrefix="Filter"
      placeholder="Filter"
      isClearable={true}
      isSearchable={false}
      options={[
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ]}
      onChange={(newValue) => {
        setAccountFilter(newValue?.value);
      }}
    />
  );
};

export default AccountFilter;
