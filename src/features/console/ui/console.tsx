import { useAppSelector } from '@app/store/hooks';

import { ConsoleStatusBar } from '@features/console/ui/console-status-bar';
import { Card, CardTitle } from '@shared/ui';
import { cn } from '@shared/lib/cn';

import './console.scss';

export const Console: React.FC = () => {
  const logs = useAppSelector(state => state.logger.logs);
  const jsxElements = logs.map((log, idx) => {
    const line = log.msg ? `> [${log.time}] ${log.msg}` : '>';
    const className = cn('console__line', `console__line--${log.type}`);
    return (
      <div key={`${log.time}-${idx}`} className={className}>
        {line}
      </div>
    );
  });

  return (
    <Card className='console'>
      <CardTitle label='Консоль' />
      <div className='console__content'>
        {jsxElements}
      </div>
      <ConsoleStatusBar msgNumber={logs.length}  />
    </Card>
  );
};
