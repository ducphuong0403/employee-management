import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import reducers from your file

const store = configureStore({
  reducer: rootReducer,
});

export default store;
