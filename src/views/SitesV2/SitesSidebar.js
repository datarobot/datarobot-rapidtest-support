// @ts-nocheck
import { useAtom } from 'jotai';
import ReactModal from 'react-modal';

import { sitesSidebarAtom } from 'rt-store';

import EditSite from './EditSite';
import AddSite from './AddSite';
import UploadSites from './UploadSites';

const SitesSidebar = () => {
  const [{ mode }, setSitesSidebar] = useAtom(sitesSidebarAtom);

  return (
    <ReactModal
      isOpen={mode}
      onRequestClose={() => setSitesSidebar({})}
      overlayClassName="LayoutV2 sidebarModalOverlay"
      className="sidebarModalContent"
    >
      {mode === 'edit' && <EditSite />}
      {mode === 'add' && <AddSite />}
      {mode === 'upload' && <UploadSites />}
    </ReactModal>
  );
};

export default SitesSidebar;
