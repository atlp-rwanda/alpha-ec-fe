import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(getByText('Posts')).toBeInTheDocument();
  });
});
