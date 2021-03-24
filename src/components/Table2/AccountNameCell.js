// @ts-nocheck
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import Checkbox from 'components/Checkbox';

import { accountsToDisableAtom } from 'rt-store';

const AccountNameCell = ({ data }) => {
  const [accounts, setAccounts] = useAtom(accountsToDisableAtom);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectAccount = () => {
    setAccounts([...accounts, data.id]);
  };

  useEffect(() => {
    setIsChecked(accounts.includes(data.id));
  }, [accounts]);

  // useEffect(() => {
  //   console.log(isChecked);
  // }, [isChecked]);

  return (
    <span className="flex items-center">
      <Checkbox onChange={handleSelectAccount} isChecked={isChecked} />
      {data.last_name}, {data.first_name}
    </span>
  );
};

export default AccountNameCell;
