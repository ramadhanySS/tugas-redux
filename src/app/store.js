import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
