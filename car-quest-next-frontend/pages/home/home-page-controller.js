import { useFormik } from 'formik';
import Home from './home-page';
import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { backendAuth } from '../../axios/instance/BaseAxios';
import { useSelector } from 'react-redux';
import { store } from '../../store/reduxStore';
import { getUserDetailsByHeader, login } from '../../utils/authenticationUtil';

const HomePageController = () => {
	// @ts-ignore
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const [newFile, setNewFile] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedType, setSelectedType] = useState('');
	const [selectedMake, setSelectedMake] = useState('');
	const [question, setQuestion] = useState(''); // Initialize with an empty string or any default value you prefer
	const [loading, setAddLoading] = useState(false);

	useEffect(() => {
		getUserDetailsByHeader();
	});

	const handleGoProfile = () => {
		router.push('/profile/profile-page');
	};

	const formik = useFormik({
		initialValues: {
			question: '',
			selectedMake: '',
			selectedYear: '',
			selectedType: '',
		},
		onSubmit: async (values) => {
			await handleAddPost(values);
		},
	});

	const handleQuestionChange = (event) => {
		setQuestion(event.target.value); // Update the question state when the text field value changes
	};

	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
	};

	const handleTypeChange = (event) => {
		setSelectedType(event.target.value);
	};

	const handleMakeChange = (event) => {
		setSelectedMake(event.target.value);
	};

	const handleAddPost = async (e) => {
		setAddLoading(true);
		const formData = new FormData();
		formData.append('question', formik.values.question);
		formData.append('selectedMake', formik.values.selectedMake);
		formData.append('selectedYear', formik.values.selectedYear);
		formData.append('selectedType', formik.values.selectedType);
		if (formik.isValid && formik.dirty) {
			e.preventDefault();
			await backendAuth({
				url: 'http://localhost:8080/api/upload',
				data: formData,
			})
				.then((response) => {
					router.push('/home/home-page'); // Replace '/homepage' with the actual path of your homepage route
					setAddLoading(false);
				})
				.catch((err) => {
					setAddLoading(false);
				});
		} else {
			formik.resetForm();
		}
		console.log('The new file is ', newFile);
	};

	return (
		<Home
			formik={formik}
			question={question}
			handleQuestionChange={handleQuestionChange}
			handleYearChange={handleYearChange}
			selectedYear={selectedYear}
			handleTypeChange={handleTypeChange}
			selectedType={selectedType}
			handleMakeChange={handleMakeChange}
			selectedMake={selectedMake}
			setNewFile={setNewFile}
			newFile={newFile}
			handleAddPost={handleAddPost}
			handleGoProfile={handleGoProfile}
		/>
	);
};

export default HomePageController;
