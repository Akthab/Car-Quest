import axios from 'axios';
import { store } from '../../store/reduxStore';

export const backendAuth = axios.create({
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
});

backendAuth.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${store.getState().user.sessionToken}`;
	return config;
});
