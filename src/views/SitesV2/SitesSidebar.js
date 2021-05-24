// @ts-nocheck
import React from 'react';
import { useAtom } from 'jotai';
import ReactModal from 'react-modal';
import cls from 'classnames';

import { sitesSidebarAtom } from 'rt-store';

import close from 'assets/images/close.svg';

import EditSiteV2 from './EditSiteV2';
import AddSiteV2 from './AddSiteV2';
import UploadSitesV2 from './UploadSitesV2';

const SitesSidebar = () => {
  const [{ mode, wide }, setSitesSidebar] = useAtom(sitesSidebarAtom);

  return (
    <ReactModal
      isOpen={!!mode}
      onRequestClose={() => setSitesSidebar({})}
      overlayClassName="LayoutV2 sidebarModalOverlay"
      className={cls('sidebarModalContent', { wide })}
    >
      <img
        className="mb-4 cursor-pointer"
        src={close}
        alt="close menu"
        onClick={() => setSitesSidebar({})}
      />
      <div className="p-4">
        {mode === 'edit' && <EditSiteV2 />}
        {mode === 'add' && <AddSiteV2 />}
        {mode === 'upload' && <UploadSitesV2 />}
      </div>
    </ReactModal>
  );
};

export default SitesSidebar;
