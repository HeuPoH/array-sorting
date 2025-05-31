import { Provider } from 'react-redux';
import { store } from 'app/store/index';

export const ReduxProvider: React.FC<React.PropsWithChildren> = props => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};
