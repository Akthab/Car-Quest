import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button } from '@mui/material';
const SampleView = (props) => {
	const { handlePost, formik } = props;

	// console.log('Form values ' + JSON.stringify(formik.values));

	return (
		<div>
			{/* <FormikProvider value={formik}> */}
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor='firstName'>First Name</label>
				<input
					id='firstName'
					name='firstName'
					type='text'
					onChange={formik.handleChange}
					value={formik.values.firstName}
				/>
				<label htmlFor='lastName'>Last Name</label>
				<input
					id='lastName'
					name='lastName'
					type='text'
					onChange={formik.handleChange}
					value={formik.values.lastName}
				/>
				<label htmlFor='email'>Email Address</label>
				<input
					id='email'
					name='email'
					type='email'
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<button type='submit'>Submit</button>
				<Button onClick={handlePost}>Add Post</Button>
				{/* </FormikProvider> */}
			</form>
		</div>
	);
};

export default SampleView;
