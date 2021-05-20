// @ts-nocheck
import { useAtom } from 'jotai';
import ReactModal from 'react-modal';

import { accountsSidebarAtom } from 'rt-store';

import EditAccount from './EditAccount';
import AddAccount from './AddAccount';
import UploadAccounts from './UploadAccounts';

const SitesSidebar = () => {
  const [{ mode }, setAccountsSidebar] = useAtom(accountsSidebarAtom);

  return (
    <ReactModal
      isOpen={mode}
      onRequestClose={() => setAccountsSidebar({})}
      overlayClassName="LayoutV2 sidebarModalOverlay"
      className="sidebarModalContent"
    >
      {mode === 'edit' && <EditAccount />}
      {mode === 'add' && <AddAccount />}
      {mode === 'upload' && <UploadAccounts />}
    </ReactModal>
  );
};

export default SitesSidebar;
