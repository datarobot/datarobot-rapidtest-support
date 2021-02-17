// @ts-nocheck
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
}) => (
  <div className="relative">
    <Input
      name={inputName}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      value={inputValue || ''}
      onKeyDown={onKeyDown}
    />

    <Icon iconName="times" className="clearIcon" onClick={onClearClick} />

    {listValues?.length > 0 && (
      <ul className="absolute bg-white w-full p-4 shadow">
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
