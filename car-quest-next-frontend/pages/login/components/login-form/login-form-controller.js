import React from 'react';
import { useState } from 'react';
import LoginFormView from './login-form-view';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { backendAuth } from '../../../../axios/instance/BaseAxios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSessionToken } from '../../../../store/slice/userSlice';

const LoginFormController = () => {
	const dispatch = useDispatch();
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
					dispatch(setSessionToken(response.data.user));
					router.push('/home');
					setLoginIsLoading(false);
				})
				.catch((err) => {
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
