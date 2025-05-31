import './form.scss';

type Option = { value: string, label: string };

interface Props<T extends Option = Option> {
  options: T[];
  option?: T;
  onSelect(option: T): void;
}

export const FormSelect: React.FC<Props> = ({ options, option, onSelect }) => {
  const jsxOptions = options.map(opt => <option key={opt.value}>{opt.label}</option>);
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const label = e.target.value;
    const value = options.find(o => o.label === label);
    if (value) {
      onSelect(value);
    }
  };

  return (
    <select
      className='form__select'
      onChange={onChange}
      defaultValue={option?.label}
    >
      {jsxOptions}
    </select>
  );
};
