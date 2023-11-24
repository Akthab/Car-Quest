import React, { useState } from 'react';
import { useFormik } from 'formik';
import AddPost from './add-post-view';
import { backendAuth } from '../../axios/instance/BaseAxios';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

const AddPostController = () => {
	const router = useRouter();
	const [newFile, setNewFile] = useState('');
	const [addIsLoading, setAddIsLoading] = useState(false);
	const AddPostSchema = Yup.object().shape({
		postTitle: Yup.string().required('Title is required'),
		postDescription: Yup.string().required('Description is required'),
		postCarType: Yup.string().required('Car Type is required'),
		postCarMake: Yup.string().required('Car Make is required'),
		postCarYear: Yup.string().required('Car Year required'),
		postCarFuelType: Yup.string().required('Car Fuel Type is required'),
	});

	const formik = useFormik({
		initialValues: {
			postTitle: '',
			postDescription: '',
			postCarType: '',
			postCarMake: '',
			postCarYear: '',
			postCarFuelType: '',
		},
		validationSchema: AddPostSchema,
		onSubmit: async (values) => {
			await handleAddPost(values);
		},
	});

	const handleAddPost = async (e) => {
		setAddIsLoading(true);
		const formData = new FormData();
		formData.append('image', newFile);
		formData.append('postTitle', formik.values.postTitle);
		formData.append('postDescription', formik.values.postDescription);
		formData.append('postCarType', formik.values.postCarType);
		formData.append('postCarMake', formik.values.postCarMake);
		formData.append('postCarYear', formik.values.postCarYear);
		formData.append('postCarFuelType', formik.values.postCarFuelType);
		if (formik.isValid && formik.dirty) {
			e.preventDefault();
			await backendAuth({
				url: 'http://localhost:8080/api/addPost',
				data: formData,
			})
				.then((response) => {
					router.push('/home'); // Replace '/homepage' with the actual path of your homepage route
					setAddIsLoading(false);
				})
				.catch((err) => {
					setAddIsLoading(false);
				});
		} else {
			formik.resetForm();
		}
		// console.log('The new file is ', newFile);
	};

	return (
		<AddPost
			formik={formik}
			handleAddPost={handleAddPost}
			setNewFile={setNewFile}
			addIsLoading={addIsLoading}
		/>
	);
};

export default AddPostController;
