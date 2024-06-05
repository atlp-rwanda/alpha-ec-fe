import { configureStore, AnyAction } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import loginReducer, {
  logInUser,
  LogInInterface
} from '../redux/slices/loginSlice';
import { ThunkDispatch } from 'redux-thunk';
import { axiosInstance, URL } from '@/utils';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const store = configureStore({
  reducer: {
    login: loginReducer
  }
});

describe('loginUser thunk', () => {
  const mock = new MockAdapter(axiosInstance);

  beforeEach(() => {
    mock.resetHandlers();
    store.dispatch({ type: 'reset' });
  });

  it('should dispatch fulfilled when login is successful', async () => {
    const userData: LogInInterface = {
      email: 'elyse@gmail.com',
      password: 'Password123!'
    };

    const response = { message: 'login successfully' };

    mock.onPost(`${URL}/api/users/login`).reply(200, response);

    const result = await (store.dispatch as AppDispatch)(logInUser(userData));

    const state = store.getState() as RootState;
    expect(state.login.loading).toBe(false);
    expect(state.login.success).toBe(true);
  });

  it('should dispatch rejected when login fails', async () => {
    const userData: LogInInterface = {
      email: 'erice@gmail.com',
      password: 'Password123!'
    };

    const errorResponse = { message: 'login failed' };

    mock.onPost(`${URL}/api/users/login`).reply(400, errorResponse);

    const result = await (store.dispatch as AppDispatch)(logInUser(userData));

    const state = store.getState() as RootState;
    expect(state.login.loading).toBe(false);
    expect(state.login.success).toBe(false);
  });
});
