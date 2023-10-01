import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import styles from './home-page.module.css';
import { useSnackbar } from 'notistack';
import {
	Button,
	Grid,
	InputLabel,
	Stack,
	Typography,
	TextField,
	MenuItem,
	FormControl,
} from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';

// third party
import { FormikProvider } from 'formik';
import React from 'react';
import Dropzone from '../../components/drop_zone';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Home = (props) => {
	const {
		formik,
		handleQuestionChange,
		question,
		handleYearChange,
		selectedYear,
		handleTypeChange,
		selectedType,
		handleMakeChange,
		selectedMake,
		setNewFile,
		newFile,
		handleAddPost,
	} = props;

	// const { errors, touched, getFieldProps } = formik;

	const [modalOpen, setModalOpen] = useState(false);

	const { enqueueSnackbar } = useSnackbar();

	const options = {
		method: 'GET',
		url: 'https://car-data.p.rapidapi.com/cars/years',
		headers: {
			'X-RapidAPI-Key': '5c389b9019mshec4c1cb992a82c8p1e4cd3jsnee0491ec2168',
			'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
		},
	};

	const typeOptions = {
		method: 'GET',
		url: 'https://car-data.p.rapidapi.com/cars/types',
		headers: {
			'X-RapidAPI-Key': '5c389b9019mshec4c1cb992a82c8p1e4cd3jsnee0491ec2168',
			'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
		},
	};

	const makeOptions = {
		method: 'GET',
		url: 'https://car-data.p.rapidapi.com/cars/makes',
		headers: {
			'X-RapidAPI-Key': '5c389b9019mshec4c1cb992a82c8p1e4cd3jsnee0491ec2168',
			'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
		},
	};

	const fetchYearOptions = () => {
		return axios.request(options);
	};

	const fetchTypeOptions = () => {
		return axios.request(typeOptions);
	};

	const fetchMakeOptions = () => {
		return axios.request(makeOptions);
	};

	const {
		isLoading: isLoadingYear,
		data: dataNew,
		isError,
		error,
	} = useQuery({
		queryKey: ['year-options'],
		queryFn: fetchYearOptions,
		cacheTime: Infinity,
	});

	const {
		isLoading: isLoadingType,
		data: dataType,
		isErrorNew,
		errorNew,
	} = useQuery({
		queryKey: ['type-options'],
		queryFn: fetchTypeOptions,
		cacheTime: Infinity,
	});

	const {
		isLoading: isLoadingMake,
		data: dataMake,
		isErrorMake,
		errormake,
	} = useQuery(
		{
			queryKey: ['make-options'],
			queryFn: fetchMakeOptions,
			cacheTime: Infinity,
		},
		{
			onSuccess: () => {
				// The following message will be shown in the snackbar when the query is successful
				enqueueSnackbar('Data successfully fetched!', { variant: 'success' });
			},
		}
	);

	if (isLoadingYear || isLoadingType || isLoadingMake) {
		return <h2> Loading ...</h2>;
	}
	if (!isLoadingYear || !isLoadingType || !isLoadingMake) {
		console.log('DATA', dataNew.data);
	}

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<div>
			<Typography>This is Akthab</Typography>
			<Button variant='contained' onClick={openModal} className='bg-blue-500'>
				Add Post
			</Button>
			<Modal
				isOpen={modalOpen}
				onRequestClose={() => setModalOpen(false)}
				className='modal-dialog mx-auto sm:w-2/3 md:w-1/2 lg:w-2/3 xl:w-3/4'
			>
				<Image
					priority
					src='/images/car_repair_02.png'
					className={styles.image_style}
					height={144}
					width={144}
					alt=''
				/>
				<div className={styles.modal_content}>
					<Typography variant='h6' className='mb-4'>
						Rev up your knowledge: Pose Your Burning Questions{' '}
					</Typography>
					<div>
						<FormikProvider value={formik}>
							<Grid container className={styles.grid_container} spacing={2}>
								<Grid item xs={12} className={styles.image_cont}>
									<Dropzone setNewFile={setNewFile} />
								</Grid>
								<Grid item xs={12}>
									<TextField
										id='outlined-multiline-static'
										label='Question'
										multiline
										rows={10}
										value={question} // Set the value of the text field to the 'question' state
										onChange={handleQuestionChange}
										defaultValue='Default Valuess'
									/>
								</Grid>
								<Grid item xs={12}>
									<Stack spacing={1.5}>
										<FormControl fullWidth>
											<InputLabel id='type-select-label'>Type</InputLabel>
											<Select
												labelId='type-select-label'
												id='type-simple-select'
												value={selectedType}
												label='Type'
												onChange={handleTypeChange}
											>
												{dataType.data.map((type) => {
													return <MenuItem value={type}>{type}</MenuItem>;
												})}
											</Select>
										</FormControl>

										<FormControl fullWidth>
											<InputLabel id='year-select-label'>Year</InputLabel>
											<Select
												labelId='year-select-label'
												id='year-simple-select'
												value={selectedYear}
												label='Year'
												onChange={handleYearChange}
											>
												{dataNew.data.map((year) => {
													return <MenuItem value={year}>{year}</MenuItem>;
												})}
											</Select>
										</FormControl>

										<FormControl fullWidth>
											<InputLabel id='make-select-label'>Make</InputLabel>
											<Select
												labelId='make-select-label'
												id='make-simple-select'
												value={selectedMake}
												label='Make'
												onChange={handleMakeChange}
											>
												{dataMake.data.map((make) => {
													return <MenuItem value={make}>{make}</MenuItem>;
												})}
											</Select>
										</FormControl>

										<TextField
											id='outlined-basic'
											label='Make'
											variant='outlined'
										/>
									</Stack>
								</Grid>

								<Grid item xs={12}>
									<Button
										// id={'submit'}
										// type='submit'
										fullWidth
										className='bg-blue-500 text-white hover:bg-red-500'
										onClick={handleAddPost}
									>
										Logins
									</Button>
								</Grid>
							</Grid>
						</FormikProvider>
					</div>
					<button onClick={closeModal}>Close Modal</button>
				</div>
			</Modal>
		</div>
	);
};

export default Home;
// function getRootProps(): React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> {
//   throw new Error("Function not implemented.");
// }

// function getInputProps(): React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement> {
//   throw new Error("Function not implemented.");
// }
