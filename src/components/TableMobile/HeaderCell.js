// @ts-nocheck
import { useAtom } from 'jotai';

import Checkbox from 'components/Checkbox';

import { headerCellCheckedAtom } from 'rt-store';

const HeaderCell = ({ api, showCheck, handleCheckChange }) => {
  const [isChecked, setIsChecked] = useAtom(headerCellCheckedAtom);

  const getData = () => {
    const dataArr = [];

    for (const key in api.getRenderedNodes()) {
      if (Object.hasOwnProperty.call(api.getRenderedNodes(), key)) {
        const { data } = api.getRenderedNodes()[key];
        dataArr.push(data);
      }
    }

    return dataArr;
  };

  return (
    <div className="flex pr-4 items-center header-cell">
      {showCheck && (
        <Checkbox
          v2
          checkClass="z-10"
          onChange={() => {
            setIsChecked(!isChecked);
            handleCheckChange(getData(), isChecked);
          }}
          isChecked={isChecked}
        />
      )}
    </div>
  );
};

export default HeaderCell;
