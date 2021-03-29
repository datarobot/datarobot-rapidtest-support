const Radio = ({ values = [], onChange, name, wrapperClass }) => (
  <div className={wrapperClass} onChange={onChange}>
    {values.map(({ label, value }, i) => (
      <label htmlFor={`${name}-${i}`} key={i} className="cursor-pointer mr-2">
        <input type="radio" value={value} name={name} id={`${name}-${i}`} />{' '}
        {label}
      </label>
    ))}
  </div>
);

export default Radio;
