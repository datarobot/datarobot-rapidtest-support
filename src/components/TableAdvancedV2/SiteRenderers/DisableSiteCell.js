// @ts-nocheck
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

import { sitesSidebarAtom } from 'rt-store';
import { editSite } from 'services/api';

import Modal from 'components/Modal';
import ToggleButton from 'components/ToggleButton';
import SuccessCheck from 'components/Notifications/SuccessCheck';

import pencil from 'assets/images/icons/pencil.svg';

const DisableSiteCell = ({ value, data: { id } }) => {
  const [, setSitesSidebar] = useAtom(sitesSidebarAtom);
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
    editSite(id, { archive: !e })
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
      <div className="flex items-center">
        {isSuccess ? (
          <SuccessCheck onAnimationEnd={handleUpdateData} />
        ) : (
          <>
            <div
              onClick={() => setSitesSidebar({ id, mode: 'edit' })}
              className="mr-4"
            >
              <img src={pencil} alt="" className="cursor-pointer" />
            </div>
            <ToggleButton
              v2
              defaultChecked={selected}
              disabled={isLoading || id === 3}
              onChange={handleToggle}
              title={selected ? 'Deactivate' : 'Activate'}
            />
          </>
        )}
        <Modal
          v2
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
