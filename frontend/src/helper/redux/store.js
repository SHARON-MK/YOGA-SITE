import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { alertsSlice } from './alertsSlice';
import { courseDetailSlice } from './courseDetailSlice';

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  courseDetail: courseDetailSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;




