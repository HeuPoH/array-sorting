import './form.scss';

interface Props {
  min?: number;
  max?: number;
  onChange(v: number): void;
}

export const FormInput: React.FC<Props> = ({ min, max, onChange }) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (!Number.isNaN(value)) {
      onChange(value);
    }
  };

  return (
    <input
      className='form__input'
      type='number'
      onChange={onChangeHandler}
      min={min}
      max={max}
    />
  );
};
