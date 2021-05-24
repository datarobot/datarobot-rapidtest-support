// @ts-nocheck
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import Checkbox from 'components/Checkbox';

import { accountsToDisableAtom, accountIdsToDisableAtom } from 'rt-store';

const AccountIdCell = ({ data }) => {
  const [accounts, setAccounts] = useAtom(accountsToDisableAtom);
  const [accountIds, setAccountIds] = useAtom(accountIdsToDisableAtom);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectAccount = () => {
    if (isChecked) {
      setAccounts(accounts.filter((a) => a.id !== data.id));
      setAccountIds(accountIds.filter((a) => a !== data.id));
    } else {
      setAccounts([...accounts, data]);
      setAccountIds([...accountIds, data.id]);
    }
  };

  useEffect(() => {
    setIsChecked(accountIds.includes(data.id));
  }, [accountIds]);

  return <Checkbox v2 onChange={handleSelectAccount} isChecked={isChecked} />;
};

export default AccountIdCell;
