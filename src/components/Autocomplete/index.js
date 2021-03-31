// @ts-nocheck
import Button, { KIND } from 'components/Button';
import Input from 'components/Input';
import Icon from 'components/Icon';

import './Autocomplete.css';

const Autocomplete = ({
  label,
  inputName,
  onChange,
  placeholder,
  inputValue,
  listValues = [],
  onClearClick = () => {},
  onKeyDown = () => {},
  onItemClick = () => {},
  isRequired,
}) => (
  <div className="relative">
    <Input
      name={inputName}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      value={inputValue || ''}
      onKeyDown={onKeyDown}
      isRequired={isRequired}
    />

    <Button
      kind={KIND.CLEAR}
      className="clearIcon"
      onClick={onClearClick}
      label={<Icon iconName="times" type="fal" />}
    />

    {listValues?.length > 0 && (
      <ul className="absolute bg-white w-full p-4 shadow-md max-h-80 overflow-y-scroll">
        {listValues.map(({ address, id, name }) => {
          const { city, state } = address;
          return (
            <li
              key={id}
              onClick={() => onItemClick(id)}
              className="py-1 cursor-pointer"
            >
              <strong>{name}</strong> - {city}, {state}
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

export default Autocomplete;
