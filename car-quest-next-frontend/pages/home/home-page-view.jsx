// @ts-nocheck
import React from 'react';
import { Button } from '@mui/material';

import PostCard from '../../components/post_card';

const Home = (props) => {
	const { handleGoProfile, handleGoAddPost } = props;

	// const { errors, touched, getFieldProps } = formik;

	return (
		<div>
			<Button
				variant='contained'
				onClick={handleGoProfile}
				className='bg-blue-500'
			>
				Profile Page
			</Button>
			<Button
				variant='contained'
				onClick={handleGoAddPost}
				className='bg-blue-500'
			>
				Add Post
			</Button>
			<PostCard />
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
