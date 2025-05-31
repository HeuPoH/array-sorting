import { ArraySettings } from 'features/array-settings';
import { Console } from 'features/console';
import { ArraySorting } from 'features/array-sorting';

import './index.scss';

export const MainPage: React.FC = () => {
  return (
    <div className='main'>
      <section className='left-panel'>
        <ArraySettings />
        <ArraySorting />
      </section>
      <section className='right-panel'>
        <Console />
      </section>
    </div>
  );
};
