// @ts-nocheck
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import ToggleButton from 'components/ToggleButton';
import SuccessCheck from 'components/Notifications/SuccessCheck';

import { sitesAtom } from 'store';
import { getSiteList, editSite } from 'services/api';

const DisableSiteCell = ({ value, data }) => {
  const [, setSites] = useAtom(sitesAtom);
  const [selected, setSelected] = useState(!value);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 1900);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const updateSite = (e) => {
    setIsLoading(true);
    editSite(data.id, { archive: !e })
      .then(async () => {
        const sites = await getSiteList();
        setIsLoading(false);
        setIsSuccess(true);
        setSites(sites);
      })
      .catch(() => {
        setSelected(!selected);
        toast.error('There was a problem updating the site.', {
          onClose: () => {
            setSelected(!selected);
            setIsLoading(false);
          },
        });
      });
  };

  return (
    <>
      {data.id !== 3 && (
        <>
          <ReactTooltip id="toggle" effect="solid" />
          <div
            className="flex items-center"
            data-tip={selected ? 'Deactivate' : 'Activate'}
            data-for="toggle"
          >
            {isSuccess ? (
              <SuccessCheck />
            ) : (
              <ToggleButton
                defaultChecked={selected}
                disabled={isLoading}
                onChange={() => {
                  updateSite(!selected);
                  setSelected(!selected);
                }}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DisableSiteCell;
