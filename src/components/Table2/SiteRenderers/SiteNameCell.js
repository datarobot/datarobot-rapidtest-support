// @ts-nocheck
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import Checkbox from 'components/Checkbox';

import { sitesToDisableAtom } from 'rt-store';

const AccountNameCell = ({ data }) => {
  const [sites, setSites] = useAtom(sitesToDisableAtom);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectAccount = () => {
    if (isChecked) {
      const updatedSites = sites.filter((s) => s !== data.id);
      return setSites(updatedSites);
    }

    setSites([...sites, data.id]);
  };

  useEffect(() => {
    setIsChecked(sites.includes(data.id));
  }, [sites]);

  return (
    <span className="flex items-center">
      <Checkbox
        onChange={handleSelectAccount}
        isChecked={isChecked}
        isDisabled={data.id === 3}
      />
      {data.site_name}
    </span>
  );
};

export default AccountNameCell;
