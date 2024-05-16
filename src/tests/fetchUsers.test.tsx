import { configureStore } from '@reduxjs/toolkit';

import fetchSlice, { fetchUsers } from '@/redux/slices/fetchSlice';

// Create a mock store with the fetchSlice reducer
const store = configureStore({
  reducer: {
    fetch: fetchSlice
  }
});

describe('fetchUsers thunk', () => {
  it('sets loading to true when pending', () => {
    const action = { type: fetchUsers.pending.type };
    store.dispatch(action);
    const state = store.getState().fetch;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('sets users and loading to false when fulfilled', () => {
    const users = [{ id: '1', name: 'User One' }];
    const action = { type: fetchUsers.fulfilled.type, payload: users };
    store.dispatch(action);
    const state = store.getState().fetch;
    expect(state.loading).toBe(false);
    expect(state.users).toEqual(users);
  });

  it('sets error and loading to false when rejected', () => {
    const error = 'Failed to fetch users';
    const action = {
      type: fetchUsers.rejected.type,
      error: { message: error }
    };
    store.dispatch(action);
    const state = store.getState().fetch;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
