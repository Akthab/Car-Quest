import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/slice/userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
