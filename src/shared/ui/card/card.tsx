import { cn } from '@shared/lib/cn';

import './card.scss';

interface Props {
  className?: string;
}

export const Card: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div className={cn('card', className)}>
      {children}
    </div>
  );
};
