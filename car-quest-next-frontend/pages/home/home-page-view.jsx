// @ts-nocheck
import React from 'react';
import { Button } from '@mui/material';

import PostCard from './components/post_card';

const Home = (props) => {
	const {
		handleGoProfile,
		handleGoAddPost,
		posts,
		postIsLoading,
		handleLogOut,
	} = props;

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
			<Button
				variant='contained'
				onClick={handleLogOut}
				className='bg-blue-500'
			>
				Log Out
			</Button>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
				{postIsLoading ? (
					<p> Loading</p>
				) : (
					posts.map((post) => <PostCard key={post._id} post={post} />)
				)}
			</div>
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
