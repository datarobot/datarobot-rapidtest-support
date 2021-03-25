// @ts-nocheck
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import Loading from 'components/Loading';
import SuccessCheck from 'components/Notifications/SuccessCheck';

import { accountsAtom } from 'rt-store';
import { getAccountList, editAccount } from 'services/api';

const DisableAccountCell = ({ value, data }) => {
  const { t } = useTranslation();
  const [, setAccounts] = useAtom(accountsAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isDoneAnimating, setIsDoneAnimating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpdateData = () => setIsDoneAnimating(true);

  useEffect(() => {
    if (isDoneAnimating) {
      getAccountList()
        .then((list) => {
          setIsSuccess(false);
          setAccounts(list);
        })
        .catch(() => {
          toast.error(
            'There was a problem updating the account list. Please refresh the page to see the latest data'
          );
        });
    }
  }, [isDoneAnimating]);

  const toggleAccountActive = () => {
    setIsLoading(true);
    editAccount(data.id, { archive: !value })
      .then(async () => {
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('There was a problem updating the account.', {
          onClose: () => {
            setIsLoading(false);
          },
        });
      });
  };

  return (
    <>
      <span className="flex justify-center">
        {isSuccess && !isLoading && (
          <div className="flex justify-center">
            <SuccessCheck onAnimationEnd={handleUpdateData} />
          </div>
        )}
        {isLoading && <Loading size={32} />}
      </span>
      <>
        {!isSuccess && !isLoading && (
          <button
            onClick={toggleAccountActive}
            className="text-blue-light py-0 px-2 flex justify-center focus:outline-none"
            type="button"
          >
            <>{!value ? t('buttons.deactivate') : t('buttons.activate')}</>
          </button>
        )}
      </>
    </>
  );
};

export default DisableAccountCell;
