import { configureStore, AnyAction } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { ThunkDispatch } from 'redux-thunk';
import { axiosInstance } from '@/utils';
import usersReducer, {
  disableAccount,
  fetchAllUsers
} from '@/redux/slices/disableaccount';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkMjI3OWQyLWM0ZWYtNGY0OC05ODY3LWJiYjgzODhiOGIwZiIsImlhdCI6MTcxODMwNDk4NiwiZXhwIjoxNzE4MzEyMTg2fQ.QgFHpcBAEVuQuCbjlUK6y1uXeidzAcGrdtUKim7h3OY';
const store = configureStore({
  reducer: {
    users: usersReducer
  }
});
const URL = process.env.NEXT_PUBLIC_API_URL;

describe('usersSlice tests', () => {
  const mock = new MockAdapter(axiosInstance);

  beforeEach(() => {
    mock.resetHandlers();
    store.dispatch({ type: 'reset' });
  });

  it.only('should dispatch fetchAllUsers.fulfilled when API call is successful', async () => {
    const mockResponse = {
      message: 'Success',
      data: [
        {
          id: 'dd2279d2-c4ef-4f48-9867-bbb8388b8b0f',
          name: 'mukunzi james',
          email: 'jmukunzindahiro@gmail.com',
          address: '123 Test Street',
          gender: 'male',
          birthdate: '1990-01-01',
          photoUrl: 'http://example.com/photo.jpg',
          status: true
        }
      ]
    };

    mock.onGet(`${URL}/api/users`).reply(200, mockResponse);

    await store.dispatch(fetchAllUsers() as any);

    const state = store.getState().users;
    console.log('stateeeeeeeeeee', state);
    expect(state.loading).toBe(false);
    expect(state.users).toEqual(mockResponse);
    expect(state.success).toBe(true);
  });

  it('should dispatch fetchAllUsers.rejected when API call fails', async () => {
    const errorMessage = 'Rejected';

    mock.onGet(`${URL}/api/users`).reply(500, { message: errorMessage });

    await store.dispatch(fetchAllUsers() as any);

    const state = store.getState().users;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.success).toBe(false);
    expect(state.users).toBeNull();
  });

  // it('should dispatch disableAccount.fulfilled when API call is successful', async () => {
  //   const userId = '39d3b917-d5b9-40e6-bf42-d3d9993dad44';
  //   const reasons = { reason: 'violation of terms' };
  //   const mockResponse = {
  //     status: 'Success!',
  //     data: null,
  //     message: 'Status has been updated to SUSPENDED'
  //   };

  //   mock
  //     .onPost(`${URL}/api/users/${userId}/account-status`)
  //     .reply(200, mockResponse);

  //   await store.dispatch(disableAccount({ userId, reasons }) as any);

  //   const state = store.getState().users;
  //   expect(state.loading).toBe(false);
  //   expect(state.message).toBe(mockResponse.message);
  //   expect(state.success).toBe(true);
  // });

  it('should dispatch disableAccount.rejected when API call fails', async () => {
    const userId = '39d3b917-d5b9-40e6-bf42-d3d9993dad44';
    const reasons = { reason: 'violation of terms' };
    const errorMessage = 'Rejected';

    mock
      .onPost(`${URL}/api/users/${userId}/account-status`)
      .reply(500, { message: errorMessage });

    await store.dispatch(disableAccount({ userId, reasons }) as any);

    const state = store.getState().users;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.success).toBe(false);
  });
});
