import { cn } from '@shared/lib/cn';

import './form.scss';

export const FormLabel: React.FC<{ label: string; className?: string }> = ({ label, className }) => {
  return <span className={cn('form__label', className)}>{label}</span>;
};
