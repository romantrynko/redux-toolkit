import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import users from './usersSlice';
import counter from './counterSlice';

const combineReducer = combineReducers({
  users,
  counter
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      // counter: {
      //   count: state.counter.count + action.payload.counter.count
      // },
      users: {
        users: [...action.payload.users.users, ...state.users.users]
      }
    };
    return nextState;
  } else {
    return combineReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer
  });

export const wrapper = createWrapper(makeStore);
