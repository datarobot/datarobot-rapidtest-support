// @ts-nocheck
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';

import Modal from 'components/Modal';
import ToggleButton from 'components/ToggleButton';
import SuccessCheck from 'components/Notifications/SuccessCheck';
import Icon from 'components/Icon';

import { ROUTES } from 'rt-constants';
import { editSite } from 'services/api';

const DisableSiteCell = ({ value, data }) => {
  const [selected, setSelected] = useState(!value);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDoneAnimating, setIsDoneAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateData = () => setIsDoneAnimating(true);

  useEffect(() => {
    if (isDoneAnimating) {
      setIsDoneAnimating(false);
      setIsSuccess(false);
      // getSiteList()
      //   .then(() => {

      //     // setSites(list);
      //   })
      //   .catch(() => {
      //     toast.error(
      //       'There was a problem updating the account list. Please refresh the page to see the latest data'
      //     );
      //   });
    }
  }, [isDoneAnimating]);

  const handleToggle = () => {
    if (selected) {
      return setShowModal(true);
    }

    updateSite(!selected);
  };

  const updateSite = (e) => {
    setIsLoading(true);
    if (showModal) {
      setShowModal(false);
    }
    setSelected(!selected);
    editSite(data.id, { archive: !e })
      .then(async () => {
        setIsLoading(false);
        setIsSuccess(true);
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
      <ReactTooltip id="toggle" effect="solid" />
      <div
        className="flex items-center"
        data-tip={selected ? 'Deactivate' : 'Activate'}
        data-for="toggle"
      >
        {isSuccess ? (
          <SuccessCheck onAnimationEnd={handleUpdateData} />
        ) : (
          <>
            <Link
              to={`${ROUTES.EDIT_SITE.path}/${data.id}`}
              className="mr-4 text-blue-lighter"
            >
              <Icon iconName="pen" type="fas" className="cursor-pointer" />
            </Link>
            <ToggleButton
              defaultChecked={selected}
              disabled={isLoading || data.id === 3}
              onChange={handleToggle}
            />
          </>
        )}
        <Modal
          show={showModal}
          title="Are you sure?"
          modalClassName="max-w-lg my-12"
          confirmButtonText="Yes, disable it"
          closeButtonText="No, keep it"
          handleClose={() => {
            setShowModal(false);
          }}
          confirmationAction={() => updateSite(!selected)}
        >
          <p className="p-16 text-center">
            Disabling this site will make it unavailable to users in the
            RapidTest app
          </p>
        </Modal>
      </div>
    </>
  );
};

export default DisableSiteCell;
