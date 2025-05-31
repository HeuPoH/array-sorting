import './form.scss';

export const FormFieldGroup: React.FC<React.PropsWithChildren> = props => {
  return (
    <div className='form__field-group'>
      {props.children}
    </div>
  );
};
