import { configureStore, AnyAction } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import productReducer, { getProducts } from '../redux/slices/ProductSlice';
import { ThunkDispatch } from 'redux-thunk';
import { axiosInstance, URL } from '@/utils';
import { render, fireEvent } from '@testing-library/react';
import { updateProduct } from '../redux/slices/updateproductSlice';
import UpdateForm from '@/app/dashboard/update-item/page';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const store = configureStore({
  reducer: {
    product: productReducer
  }
});
describe('Products thunk', () => {
  const mock = new MockAdapter(axiosInstance);

  beforeEach(() => {
    mock.resetHandlers();
    store.dispatch({ type: 'reset' });
  });
  it('should dispatch fulfilled when products fetched successfully', async () => {
    const products = {
      rows: [
        {
          id: 1,
          name: 'MAZDA',
          categoryId: '2d854884-ea82-468f-9883-c86ce8d5a001',
          price: 5000
        },
        {
          id: 2,
          name: 'MAZDA',
          categoryId: '2d854884-ea82-468f-9883-c86ce8d5a001',
          price: 5000
        }
      ],
      count: 10
    };

    const response = {
      status: 'Success!',
      data: products,
      message: 'Products fetched successfully'
    };

    mock.onGet(`${URL}/api/products`).reply(200, response);

    const query = {};
    await (store.dispatch as AppDispatch)(getProducts(query));

    const state = store.getState() as RootState;
    expect(state.product.loading).toBe(false);
  });
  it('should dispatch Rejected when products fetch fails', async () => {
    const errorResponse = {
      status: 'Error!',
      data: [],
      message: 'Failed to fetch products'
    };

    mock.onGet(`${URL}/api/products`).reply(400, errorResponse);

    const query = {};
    await (store.dispatch as AppDispatch)(getProducts(query));

    const state = store.getState() as RootState;
    expect(state.product.loading).toBe(false);
    expect(state.product.success).toBe(false);
    expect(state.product.error).toBe('Failed to fetch products');
  });
});
