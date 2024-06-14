import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import Form from '@/app/dashboard/product/page';
import axios from 'axios';
import productReducer, { addProduct } from '../redux/slices/productSlice';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import store from '../redux/store';

const Mocktest = new MockAdapter(axios);

describe('addProduct thunk', () => {
  it('render ', async () => {
    const result = render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
  });
});
