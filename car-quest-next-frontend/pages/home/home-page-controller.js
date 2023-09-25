import { useFormik } from 'formik';
import Home from './home-page';
import { useState } from 'react';

const HomePageController = () => {
	const [newFile, setNewFile] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedType, setSelectedType] = useState('');
	const [selectedMake, setSelectedMake] = useState('');
	const [question, setQuestion] = useState(''); // Initialize with an empty string or any default value you prefer

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
		const formData = new FormData();
		formData.append('question', formik.values.question);
		formData.append('selectedMake', formik.values.selectedMake);
		formData.append('selectedYear', formik.values.selectedYear);
		formData.append('selectedType', formik.values.selectedType);
		if (formik.isValid && formik.dirty) {
			e.preventDefault();
			await backendAuth({
				url: 'http://localhost:8080/api/upload',
				data: {
					email: formik.values.email,
					password: formik.values.password,
				},
			})
				.then((response) => {
					router.push('/home/home-page'); // Replace '/homepage' with the actual path of your homepage route
					setLoginIsLoading(false);
				})
				.catch((err) => {
					setLoginIsLoading(false);
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
		/>
	);
};

export default HomePageController;
