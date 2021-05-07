import './RadioV2.css';

const RadioV2 = ({ values = [], onChange, name, wrapperClass }) => (
  <div className={wrapperClass} onChange={onChange}>
    {values.map(({ label, value }, i) => (
      <label className="RadioV2" key={`${name}-${value}-${i}`}>
        <span className="radio__input">
          <input type="radio" value={value} name={name} id={`${name}-${i}`} />
          <span className="radio__control" />
        </span>
        <span className="radio__label">{label}</span>
      </label>
    ))}
  </div>
);

export default RadioV2;
