import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoggedIn: false,
	sessionToken: '',
	userDetails: {
		id: '',
		userEmail: '',
		userMobileNumber: '',
		userName: '',
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setSessionToken: (state, action) => {
			state.isLoggedIn = true;
			state.sessionToken = action.payload;
		},
		userLogin: (state, action) => {
			(state.isLoggedIn = true), (state.userDetails = action.payload);
		},
		userLogout: (state, action) => {
			state = initialState;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSessionToken, userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
