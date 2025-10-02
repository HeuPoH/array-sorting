import { cn } from '@shared/lib/cn';

import './buttons.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick(e: React.MouseEvent): void;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<Props> = ({ className, label, children, ...rest }) => {
  return (
    <button
      className={cn(className, 'button', rest.disabled && 'button--disabled')}
      {...rest}
    >
      {label ? label : children}
    </button>
  );
};

export const SecondaryButton: React.FC<Props> = props => {
  return <Button {...props} className={cn(props.className, 'button--secondary')} />;
};

export const PrimaryButton: React.FC<Props> = props => {
  return <Button {...props} className={cn(props.className, 'button--primary')} />;
};

export const DangerButton: React.FC<Props> = props => {
  return <Button {...props} className={cn(props.className, 'button--danger')} />;
};

export const ApplyButton: React.FC<Props> = props => {
  return <Button {...props} className={cn(props.className, 'button--apply')} />;
};
