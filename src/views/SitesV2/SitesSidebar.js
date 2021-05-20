// @ts-nocheck
import { useAtom } from 'jotai';
import ReactModal from 'react-modal';

import { sitesSidebarAtom } from 'rt-store';

import EditSiteV2 from './EditSite';
import AddSiteV2 from './AddSite';
import UploadSitesV2 from './UploadSites';

const SitesSidebar = () => {
  const [{ mode }, setSitesSidebar] = useAtom(sitesSidebarAtom);

  return (
    <ReactModal
      isOpen={mode}
      onRequestClose={() => setSitesSidebar({})}
      overlayClassName="LayoutV2 sidebarModalOverlay"
      className="sidebarModalContent"
    >
      {mode === 'edit' && <EditSiteV2 />}
      {mode === 'add' && <AddSiteV2 />}
      {mode === 'upload' && <UploadSitesV2 />}
    </ReactModal>
  );
};

export default SitesSidebar;
