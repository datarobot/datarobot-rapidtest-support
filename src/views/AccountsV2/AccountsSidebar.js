// @ts-nocheck
import { useAtom } from 'jotai';
import ReactModal from 'react-modal';

import { accountsSidebarAtom } from 'rt-store';

import EditAccountV2 from './EditAccountV2';
import AddAccountV2 from './AddAccountV2';
import UploadAccountsV2 from './UploadAccountsV2';

const SitesSidebar = () => {
  const [{ mode }, setAccountsSidebar] = useAtom(accountsSidebarAtom);

  return (
    <ReactModal
      isOpen={mode}
      onRequestClose={() => setAccountsSidebar({})}
      overlayClassName="LayoutV2 sidebarModalOverlay"
      className="sidebarModalContent"
    >
      {mode === 'edit' && <EditAccountV2 />}
      {mode === 'add' && <AddAccountV2 />}
      {mode === 'upload' && <UploadAccountsV2 />}
    </ReactModal>
  );
};

export default SitesSidebar;
