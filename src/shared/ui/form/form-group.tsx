import './form.scss';

export const FormGroup: React.FC<React.PropsWithChildren> = props => {
  return (
    <div className='form--group'>
      {props.children}
    </div>
  );
};
