// @ts-nocheck
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import Checkbox from 'components/Checkbox';

import { sitesToDisableAtom, siteIdsToDisableAtom } from 'rt-store';

const SiteNameCell = ({ data }) => {
  const [sites, setSites] = useAtom(sitesToDisableAtom);
  const [siteIds, setSiteIds] = useAtom(siteIdsToDisableAtom);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectSite = () => {
    if (isChecked) {
      setSites(sites.filter((a) => a.id !== data.id));
      setSiteIds(siteIds.filter((a) => a !== data.id));
    } else {
      setSites([...sites, data]);
      setSiteIds([...siteIds, data.id]);
    }
  };

  useEffect(() => {
    setIsChecked(siteIds.includes(data.id));
  }, [siteIds]);

  return (
    <span className="flex items-center">
      <Checkbox
        onChange={handleSelectSite}
        isChecked={isChecked}
        isDisabled={data.id === 3}
      />
      {data.site_name}
    </span>
  );
};

export default SiteNameCell;
