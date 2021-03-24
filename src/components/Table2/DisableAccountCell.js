// @ts-nocheck
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import Icon from 'components/Icon';

import Loading from 'components/Loading';
import SuccessCheck from 'components/Notifications/SuccessCheck';

import { accountsAtom } from 'rt-store';
import { getAccountList, editAccount } from 'services/api';

import { ROUTES } from 'rt-constants';

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
        .catch((err) => {
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
    <span className="flex">
      <Link to={`${ROUTES.EDIT_ACCOUNT.path}/${data.id}`} className="mr-2">
        <Icon
          iconName="pencil-alt"
          type="fal"
          color="#5282cc"
          className="cursor-pointer"
        />
      </Link>
      {isSuccess ? (
        <div className="flex justify-center">
          <SuccessCheck onAnimationEnd={handleUpdateData} />
        </div>
      ) : (
        <button
          onClick={toggleAccountActive}
          className="text-blue-light py-0 px-2 flex justify-center focus:outline-none"
          type="button"
        >
          {isLoading ? (
            <Loading size={32} />
          ) : (
            <>{!value ? t('buttons.deactivate') : t('buttons.activate')}</>
          )}
        </button>
      )}
    </span>
  );
};

export default DisableAccountCell;
