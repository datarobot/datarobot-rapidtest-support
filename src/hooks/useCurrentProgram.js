import { useEffect, useState } from 'react';

import { getPrograms } from 'services/api';
import { get } from 'utils';

const useCurrentProgram = () => {
  const [currentProgram, setCurrentProgram] = useState('');
  useEffect(() => {
    const fetchCurrentProgram = async () => {
      const programs = await getPrograms();
      setCurrentProgram(programs[get('program')][0]);
    };
    fetchCurrentProgram();
  }, []);

  return currentProgram;
};

export default useCurrentProgram;
