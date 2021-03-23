import React from 'react';
import ReactModal from 'react-modal';
import cls from 'classnames';

import Icon from 'components/Icon';

import './Modal.css';

const Modal = ({
  show = false,
  handleClose,
  children,
  title,
  modalClassName,
  modalOverlayClassName,
  closeOnOverlayClick,
  confirmButtonText = 'Save',
  closeButtonText = 'Cancel',
  closeAction,
  confirmationAction = () => {},
  showFooter = true,
  ...rest
}) => {
  ReactModal.setAppElement('body');

  return (
    <ReactModal
      isOpen={show}
      contentLabel={title}
      className={cls('modal', modalClassName)}
      overlayClassName={cls('overlay', modalOverlayClassName)}
      shouldCloseOnOverlayClick={closeOnOverlayClick}
      onRequestClose={closeAction}
      bodyOpenClassName="openedModal"
      {...rest}
    >
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none">
        <div
          className={cls('relative w-auto my-6 mx-auto z-40', modalClassName)}
        >
          {/* content */}
          <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-blue-lightest outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between pt-16 px-6 rounded-t text-center">
              <h3 className="text-2xl w-full font-semibold text-blue">
                {title}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-75 float-right text-3xl leading-none outline-none focus:outline-none"
                onClick={handleClose}
              >
                <span className=" absolute top-10 right-10 bg-transparent -mt-1 text-blue font-bold opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <Icon iconName="times-circle" type="fal" />
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative flex-auto">{children}</div>
            {/* footer */}
            {showFooter && (
              <div className="modal-footer">
                <span>
                  <button
                    className="btn-clear mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={handleClose}
                  >
                    {closeButtonText}
                  </button>
                  <button
                    className="btn-primary mr-1 mb-1"
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={confirmationAction}
                  >
                    {confirmButtonText}
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0 z-20 bg-black"
        onClick={handleClose}
      />
    </ReactModal>
  );
};

export default Modal;
