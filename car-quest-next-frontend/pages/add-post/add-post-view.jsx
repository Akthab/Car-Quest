// @ts-nocheck
import React from 'react';
import styles from './add-post.module.css';
import {
	Button,
	Grid,
	InputLabel,
	Stack,
	Typography,
	TextField,
	MenuItem,
	FormControl,
	CircularProgress,
	FormHelperText,
} from '@mui/material';

import Select from '@mui/material/Select';

// third party
import { FormikProvider } from 'formik';
import Dropzone from '../../components/drop_zone';

import MainLayout from '../../layouts/MainLayout';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const AddPost = (props) => {
	const { formik, handleAddPost, setNewFile, addIsLoading } = props;

	const { errors, touched, getFieldProps } = formik;

	// const options = {
	// 	method: 'GET',
	// 	url: 'https://car-data.p.rapidapi.com/cars/years',
	// 	headers: {
	// 		'X-RapidAPI-Key': '5c389b9019mshec4c1cb992a82c8p1e4cd3jsnee0491ec2168',
	// 		'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
	// 	},
	// };

	// const typeOptions = {
	// 	method: 'GET',
	// 	url: 'https://car-data.p.rapidapi.com/cars/types',
	// 	headers: {
	// 		'X-RapidAPI-Key': '5c389b9019mshec4c1cb992a82c8p1e4cd3jsnee0491ec2168',
	// 		'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
	// 	},
	// };

	// const makeOptions = {
	// 	method: 'GET',
	// 	url: 'https://car-data.p.rapidapi.com/cars/makes',
	// 	headers: {
	// 		'X-RapidAPI-Key': '5c389b9019mshec4c1cb992a82c8p1e4cd3jsnee0491ec2168',
	// 		'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
	// 	},
	// };

	// const fetchYearOptions = () => {
	// 	return axios.request(options);
	// };

	// const fetchTypeOptions = () => {
	// 	return axios.request(typeOptions);
	// };

	// const fetchMakeOptions = () => {
	// 	return axios.request(makeOptions);
	// };

	// const {
	// 	isLoading: isLoadingYear,
	// 	data: dataNew,
	// 	isError,
	// 	error,
	// } = useQuery({
	// 	queryKey: ['year-options'],
	// 	queryFn: fetchYearOptions,
	// 	cacheTime: Infinity,
	// });

	// const {
	// 	isLoading: isLoadingType,
	// 	data: dataType,
	// 	isErrorNew,
	// 	errorNew,
	// } = useQuery({
	// 	queryKey: ['type-options'],
	// 	queryFn: fetchTypeOptions,
	// 	cacheTime: Infinity,
	// });

	// const {
	// 	isLoading: isLoadingMake,
	// 	data: dataMake,
	// 	isErrorMake,
	// 	errormake,
	// } = useQuery({
	// 	queryKey: ['make-options'],
	// 	queryFn: fetchMakeOptions,
	// 	cacheTime: Infinity,
	// });

	// if (isLoadingYear || isLoadingType || isLoadingMake) {
	// 	return <h2> Loading ...</h2>;
	// }

	return (
		<div style={{ backgroundColor: '#d2e4f3' }}>
			<div className='flex items-center justify-center'>
				<div className={styles.modal_content}>
					<Typography
						variant='h6'
						sx={{ fontSize: '1.45rem', mb: '26px', color: '#b31111' }}
					>
						Rev up your knowledge: Pose Your Burning Questions{' '}
					</Typography>
					<div>
						<FormikProvider value={formik}>
							{/* <form onSubmit={formik.handleSubmit}> */}
							<Grid container className={styles.grid_container} spacing={3}>
								<Grid item xs={12} className={styles.image_cont}>
									<Dropzone setNewFile={setNewFile} />
								</Grid>
								<Grid item xs={12} className={styles.image_cont}>
									<TextField
										id='postTitle'
										label='Post Title'
										onChange={formik.handleChange}
										value={formik.values.postTitle}
										className={styles.post_title}
										{...getFieldProps('postTitle')}
										error={Boolean(touched.postTitle && errors.postTitle)}
									/>
									{touched.postTitle && errors.postTitle && (
										<FormHelperText
											error
											id='standard-weight-helper-text-post-title'
										>
											{errors.postTitle}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										id='postDescription'
										label='Post Description'
										multiline
										rows={10}
										onChange={formik.handleChange}
										value={formik.values.postDescription}
										style={{ backgroundColor: 'rgb(218, 255, 234)' }}
										{...getFieldProps('postDescription')}
										error={Boolean(
											touched.postDescription && errors.postDescription
										)}
									/>
									{touched.postDescription && errors.postDescription && (
										<FormHelperText
											error
											id='standard-weight-helper-text-post-description'
										>
											{errors.postDescription}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12}>
									<Stack spacing={1.8}>
										<FormControl fullWidth>
											<InputLabel id='type-select-label'>Car Type</InputLabel>
											<Select
												labelId='type-select-label'
												label='Car Type'
												id='postCarType'
												name='postCarType'
												onChange={formik.handleChange}
												value={formik.values.postCarType}
												style={{ backgroundColor: 'rgb(218, 255, 234)' }}
												{...getFieldProps('postCarType')}
												error={Boolean(
													touched.postCarType && errors.postCarType
												)}
											>
												<MenuItem value={'Van'}>Van</MenuItem>
												<MenuItem value={'Car'}>Car</MenuItem>
												{/* {dataType.data.map((type) => {
													return <MenuItem value={type}>{type}</MenuItem>;
												})} */}
											</Select>
											{touched.postCarType && errors.postCarType && (
												<FormHelperText
													error
													id='standard-weight-helper-text-post-car-type'
												>
													{errors.postCarType}
												</FormHelperText>
											)}
										</FormControl>

										<FormControl fullWidth>
											<InputLabel id='year-select-label'>Year</InputLabel>
											<Select
												labelId='year-select-label'
												label='Year'
												id='postCarYear'
												name='postCarYear'
												onChange={formik.handleChange}
												value={formik.values.postCarYear}
												style={{ backgroundColor: 'rgb(218, 255, 234)' }}
												{...getFieldProps('postCarYear')}
												error={Boolean(
													touched.postCarYear && errors.postCarYear
												)}
											>
												{/* {dataNew.data.map((year) => {
													return <MenuItem value={year}>{year}</MenuItem>;
												})} */}
												<MenuItem value={'2012'}>2012</MenuItem>
												<MenuItem value={'2020'}>2020</MenuItem>
											</Select>
											{touched.postCarYear && errors.postCarYear && (
												<FormHelperText
													error
													id='standard-weight-helper-text-post-car-year'
												>
													{errors.postCarYear}
												</FormHelperText>
											)}
										</FormControl>

										<FormControl fullWidth>
											<InputLabel id='make-select-label'>Make</InputLabel>
											<Select
												labelId='make-select-label'
												label='Make'
												id='postCarMake'
												name='postCarMake'
												onChange={formik.handleChange}
												value={formik.values.postCarMake}
												style={{ backgroundColor: 'rgb(218, 255, 234)' }}
												{...getFieldProps('postCarMake')}
												error={Boolean(
													touched.postCarMake && errors.postCarMake
												)}
											>
												<MenuItem value={'Toyota'}>Toyota</MenuItem>
												<MenuItem value={'Ford'}>Ford</MenuItem>
												{/* {dataMake.data.map((make) => {
													return <MenuItem value={make}>{make}</MenuItem>;
												})} */}
											</Select>
											{touched.postCarMake && errors.postCarMake && (
												<FormHelperText
													error
													id='standard-weight-helper-text-post-car-make'
												>
													{errors.postCarMake}
												</FormHelperText>
											)}
										</FormControl>
										<FormControl fullWidth>
											<InputLabel id='make-select-label'>Fuel Type</InputLabel>
											<Select
												labelId='make-select-label'
												label='Fuel Type'
												id='postCarFuelType'
												name='postCarFuelType'
												onChange={formik.handleChange}
												value={formik.values.postCarFuelType}
												style={{ backgroundColor: 'rgb(218, 255, 234)' }}
												{...getFieldProps('postCarFuelType')}
												error={Boolean(
													touched.postCarFuelType && errors.postCarFuelType
												)}
											>
												<MenuItem value={'Petrol'}>Petrol</MenuItem>
												<MenuItem value={'Diesel'}>Diesel</MenuItem>
												<MenuItem value={'Hybrid'}>Hybrid</MenuItem>
												<MenuItem value={'Electric'}>Electric</MenuItem>
											</Select>
											{touched.postCarFuelType && errors.postCarFuelType && (
												<FormHelperText
													error
													id='standard-weight-helper-text-post-car-fuel-type'
												>
													{errors.postCarFuelType}
												</FormHelperText>
											)}
										</FormControl>
									</Stack>
								</Grid>

								<Grid item xs={12} className={styles.image_cont}>
									<Button
										sx={{
											backgroundColor: '#668279',
											color: 'azure',
											fontWeight: 500,
											fontSize: 18,
											padding: '8px 8px',
											mt: 3,
											'&:hover': {
												backgroundColor: 'blue',
											},
										}}
										id={'submit'}
										disabled={addIsLoading || !(formik.isValid && formik.dirty)}
										type='submit'
										fullWidth
										className='bg-slate-700 text-azure font-medium text-base px-4 py-2 mt-4'
										onClick={handleAddPost}
										startIcon={
											addIsLoading ? <CircularProgress size={15} /> : null
										}
									>
										Submit
									</Button>
								</Grid>
							</Grid>
						</FormikProvider>
						{/* </form> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPost;

// function getRootProps(): React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> {
//   throw new Error("Function not implemented.");
// }

// function getInputProps(): React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement> {
//   throw new Error("Function not implemented.");
// }
