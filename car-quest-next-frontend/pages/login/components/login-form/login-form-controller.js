import React from 'react';
import { useState } from 'react';
import LoginFormView from './login-form-view';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { backendAuth } from '../../../../axios/instance/BaseAxios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSessionToken } from '../../../../store/slice/userSlice';
import { enqueueSnackbar, useSnackbar } from 'notistack';

const LoginFormController = () => {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email('Must be a valid email')
			.max(255)
			.required('Email is required'),
		password: Yup.string().max(255).required('Password is required'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			remember: true,
		},
		validationSchema: LoginSchema,
		onSubmit: async (values) => {
			await handleSignIn(values);
		},
	});

	const [loginIsLoading, setLoginIsLoading] = useState(false);
	const router = useRouter();

	const handleSignIn = async (e) => {
		if (formik.isValid && formik.dirty) {
			setLoginIsLoading(true);

			e.preventDefault();
			await backendAuth({
				url: 'http://localhost:8080/api/login',
				data: {
					email: formik.values.email,
					password: formik.values.password,
				},
			})
				.then((response) => {
					console.log('In the then ');
					if (response.data.responseCode.charAt(0) == '1') {
						dispatch(setSessionToken(response.data.responseData));
						router.push('/home');
						enqueueSnackbar(response.data.responseMessage, {
							variant: 'success',
						});
						// setLoginIsLoading(false);
					} else if (response.data.responseCode.charAt(0) == '4') {
						console.log('In the else condition ');
						enqueueSnackbar(response.data.responseMessage, {
							variant: 'error',
						});
					}
					setLoginIsLoading(false);
				})
				.catch((err) => {
					if (err.response && err.response.data) {
						const { responseCode, responseMessage } = err.response.data;
						if (responseCode.charAt(0) == '4') {
							enqueueSnackbar(responseMessage, { variant: 'error' });
						}
					} else {
						// Handle generic error
						enqueueSnackbar('An error occurred', { variant: 'error' });
					}
					setLoginIsLoading(false);
				});
		} else {
			formik.resetForm();
		}
	};

	return (
		<>
			<LoginFormView
				formik={formik}
				handleSignIn={handleSignIn}
				loginIsLoading={loginIsLoading}
			/>
		</>
	);
};

export default LoginFormController;
