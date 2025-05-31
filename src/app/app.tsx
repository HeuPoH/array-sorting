import { MainPage } from 'pages/main';
import { ReduxProvider } from 'app/providers/redux-provider';
import { ServicesProvider } from 'app/providers/services-provider';

export const App: React.FC = () => {
  return (
    <ReduxProvider>
      <ServicesProvider>
        <MainPage />
      </ServicesProvider>
    </ReduxProvider>
  );
};
