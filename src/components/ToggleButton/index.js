import { useState } from 'react';

import { DragSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css';

import './ToggleButton.css';

// eslint-disable-next-line no-unused-vars
const ToggleButton = ({ selected, toggleSelected }) => {
  const [isSelected, setIsSelected] = useState(selected);
  return (
    <DragSwitch
      checked={isSelected}
      onColor="#00528D"
      onChange={(e) => {
        setIsSelected(e);
      }}
    />
  );
};
export default ToggleButton;
