import { backendAuth } from '../axios/instance/BaseAxios';
import { userLogin } from '../store/slice/userSlice';
import { store } from '../store/reduxStore';

export const getUserDetailsByHeader = async () => {
	await backendAuth({
		url: 'http://127.0.0.1:8080/api/getUserDetailsByHeader',
	})
		.then((response) => {
			if (response.data.responseCode.charAt(0) == '1') {
				store.dispatch(userLogin(response.data.responseData));
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
