import { useAtom } from 'jotai';

import { accountsSidebarAtom } from 'rt-store';

import pencil from 'assets/images/icons/pencil.svg';

const EditAccountCell = ({ data: { id } }) => {
  const [, setAccountsSidebar] = useAtom(accountsSidebarAtom);

  return (
    <div onClick={() => setAccountsSidebar({ id, mode: 'edit' })}>
      <img src={pencil} alt="" className="cursor-pointer" />
    </div>
  );
};

export default EditAccountCell;
