// @ts-nocheck
import React from 'react';
import { useAtom } from 'jotai';
import ReactModal from 'react-modal';
import cls from 'classnames';

import { accountsSidebarAtom } from 'rt-store';

import close from 'assets/images/close.svg';

import EditAccountV2 from './EditAccountV2';
import AddAccountV2 from './AddAccountV2';
import UploadAccountsV2 from './UploadAccountsV2';

const SitesSidebar = () => {
  const [{ mode, wide }, setAccountsSidebar] = useAtom(accountsSidebarAtom);

  return (
    <ReactModal
      isOpen={mode}
      onRequestClose={() => setAccountsSidebar({})}
      overlayClassName="LayoutV2 sidebarModalOverlay"
      className={cls('sidebarModalContent', { wide })}
    >
      <img
        className="mb-4"
        src={close}
        alt="close menu"
        onClick={() => setAccountsSidebar({})}
      />
      <div className="p-4">
        {mode === 'edit' && <EditAccountV2 />}
        {mode === 'add' && <AddAccountV2 />}
        {mode === 'upload' && <UploadAccountsV2 />}
      </div>
    </ReactModal>
  );
};

export default SitesSidebar;
