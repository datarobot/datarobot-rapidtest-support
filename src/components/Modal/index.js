import React from 'react';
import ReactModal from 'react-modal';
import cls from 'classnames';

import Icon from 'components/Icon';
import Button from 'components/Button';

import './Modal.css';

const Modal = ({
  v2 = false,
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
      overlayClassName={cls('overlay', modalOverlayClassName, { LayoutV2: v2 })}
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
          <div
            className={cls(
              'border-0 rounded shadow-lg relative flex flex-col w-full outline-none focus:outline-none',
              { 'bg-blue-lightest': !v2, 'bg-white': v2 }
            )}
          >
            {/* header */}
            <div className="flex items-start justify-between pt-16 px-6 rounded-t text-center">
              <h3
                className={cls('text-2xl w-full font-semibold', {
                  'text-blue': !v2,
                })}
              >
                {title}
              </h3>
              <button
                className={cls(
                  'p-1 ml-auto bg-transparent border-0 opacity-75 float-right text-3xl leading-none outline-none focus:outline-none',
                  { 'text-black': !v2 }
                )}
                onClick={handleClose}
              >
                <span
                  className={cls(
                    'absolute top-10 right-10 bg-transparent -mt-1 font-bold opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none',
                    { 'text-blue': !v2 }
                  )}
                >
                  <Icon iconName="times-circle" type="fal" />
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative flex-auto">{children}</div>
            {/* footer */}
            {showFooter && (
              <div className="modal-footer">
                {v2 ? (
                  <>
                    <Button
                      v2={v2}
                      transparent
                      small
                      type="button"
                      style={{ transition: 'all .15s ease' }}
                      onClick={handleClose}
                    >
                      {closeButtonText}
                    </Button>
                    <Button
                      v2={v2}
                      primary
                      small
                      className="ml-4"
                      type="button"
                      style={{ transition: 'all .15s ease' }}
                      onClick={confirmationAction}
                    >
                      {confirmButtonText}
                    </Button>
                  </>
                ) : (
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
                )}
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
