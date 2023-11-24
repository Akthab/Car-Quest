import axios from 'axios';
import { store } from '../../store/reduxStore';

export const backendAuth = axios.create({
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
});

backendAuth.interceptors.request.use((config) => {
	if (config.url === 'http://localhost:8080/api/addPost') {
		config.headers['Content-Type'] = 'multipart/form-data';
	}
	return config;
});

backendAuth.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${store.getState().user.sessionToken}`;
	return config;
});
