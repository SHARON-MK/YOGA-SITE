// courseDetailSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const courseDetailSlice = createSlice({
  name: 'courseDetail',
  initialState: {},
  reducers: {
    setCourseDetail: (state, action) => {
      return action.payload;
    },
    clearCourseDetail: (state) => {
      return {}; // Set it to an initial or empty state
    },
  },
});

export const { setCourseDetail, clearCourseDetail } = courseDetailSlice.actions;
export default courseDetailSlice.reducer;





// for clearing the data stored in redux state - use below code

// import { useDispatch } from 'react-redux';
// import { clearCourseDetail } from '../../path-to-your-courseDetailSlice';

// const dispatch = useDispatch();

// const handleClearCourseDetail = () => {
//     dispatch(clearCourseDetail());    ---- main code
//   };