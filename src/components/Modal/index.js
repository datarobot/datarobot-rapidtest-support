import React from 'react';
import ReactModal from 'react-modal';
import cls from 'classnames';

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
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-6 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-2xl font-semibold uppercase">{title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-75 float-right text-3xl leading-none outline-none focus:outline-none"
                onClick={handleClose}
              >
                <span className="bg-transparent -mt-1 text-blue font-bold opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">{children}</div>
            {/* footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
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
            </div>
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
