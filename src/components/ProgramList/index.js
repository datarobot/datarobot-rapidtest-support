// @ts-nocheck
import { useEffect, useState } from 'react';

import Select from 'components/Select';

import { get } from 'utils';
import { getPrograms } from 'services/api';

const ProgramList = ({
  v2 = false,
  onChange,
  name,
  label = 'Your program',
  selected,
}) => {
  const [programList, setProgramList] = useState([]);

  const buildProgramList = async () => {
    const programs = await getPrograms();

    const programArr = [];

    for (const key in programs) {
      if (Object.hasOwnProperty.call(programs, key)) {
        const prog = programs[key][0];
        programArr.push({ value: key, label: `${key} - ${prog.name}` });
      }
    }

    setProgramList(programArr);
  };

  useEffect(() => {
    buildProgramList();
  }, []);

  return (
    <Select
      v2={v2}
      name={name}
      placeholder="Select a program"
      label={label}
      options={programList}
      onChange={onChange}
      value={selected || get('program')}
    />
  );
};

export default ProgramList;
