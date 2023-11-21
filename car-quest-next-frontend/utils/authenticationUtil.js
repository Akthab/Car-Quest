// @ts-nocheck
import { useDispatch } from 'react-redux';
import { backendAuth } from '../axios/instance/BaseAxios';
// @ts-ignore
import { userLogin } from '../store/slice/userSlice';
import { store } from '../store/reduxStore';

export const getUserDetailsByHeader = async () => {
	await backendAuth({
		// method: 'GET',
		url: 'http://127.0.0.1:8080/api/getUserDetailsByHeader',
	}).then((response) => {
		store.dispatch(userLogin(response.data));
	});
};

export const login = () => {
	backendAuth({
		url: 'http://localhost:8080/api/login',
		data: {
			email: 'mhmdakthab6@gmail.com',
			password: 'name+123456',
		},
	})
		.then((response) => {
			console.log(response.data.user);
		})
		.catch((err) => {
			setLoginIsLoading(false);
		});
};
