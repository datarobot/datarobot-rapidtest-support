// @ts-nocheck
import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import Icon from 'components/Icon';
import Loading from 'components/Loading';
import SuccessCheck from 'components/Notifications/SuccessCheck';

import { accountsAtom } from 'rt-store';
import { getAccountList, editAccount } from 'services/api';

const DisableAccountCell = ({ value, data }) => {
  // const { t } = useTranslation();
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
      .then(() => {
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

  const resendEmail = () => {
    setIsLoading(true);
    editAccount(data.id, { resend_email: true })
      .then(() => {
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
      <span className="flex justify-end">
        {isSuccess && !isLoading && (
          <div className="flex justify-end">
            <SuccessCheck onAnimationEnd={handleUpdateData} />
          </div>
        )}
        {isLoading && <Loading containerClassName="w-8" size={32} />}
      </span>
      <>
        {!isSuccess && !isLoading && (
          <span className="flex items-center justify-end">
            {!data.last_login_ip && (
              <>
                <button
                  onClick={resendEmail}
                  className="text-blue-light text-lg py-0 px-2 border-r border-blue-lighter px-1 flex justify-center focus:outline-none"
                  type="button"
                >
                  <Icon iconName="envelope" type="fal" />
                </button>
              </>
            )}
            <button
              onClick={toggleAccountActive}
              className="text-blue-light text-lg py-0 px-2 flex justify-center focus:outline-none"
              type="button"
            >
              <>
                {!value ? (
                  <Icon iconName="user-slash" type="fal" />
                ) : (
                  <Icon iconName="user-plus" type="fal" />
                )}
              </>
            </button>
          </span>
        )}
      </>
    </>
  );
};

export default DisableAccountCell;
