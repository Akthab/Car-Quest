import React from 'react';
import SampleView from './sample-view';
import { useFormik } from 'formik';

const SampleController = () => {
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
		},
		onSubmit: (values) => {
			console.log('FormData ' + JSON.stringify(values));
		},
	});

	const handlePost = () => {
		console.log('In the handle post');
	};
	// @ts-ignore
	return <SampleView handlePost={handlePost} formik={formik} />;
};

export default SampleController;
