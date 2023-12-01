import Home from './home-page-view';
import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { getUserDetailsByHeader, login } from '../../utils/authenticationUtil';
import { backendAuth } from '../../axios/instance/BaseAxios';

const HomePageController = () => {
	// @ts-ignore
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const [posts, setPosts] = useState([]);
	const [postIsLoading, setPostIsLoading] = useState(false);

	useEffect(() => {
		getUserDetailsByHeader();
		getAllPosts();
	}, []);

	const handleGoProfile = () => {
		router.push('/profile');
	};

	const handleGoAddPost = () => {
		router.push('/add-post');
	};

	const getAllPosts = async (e) => {
		setPostIsLoading(true);
		// e.preventDefault();
		await backendAuth({
			method: 'GET',
			url: 'http://localhost:8080/api/getAllPosts',
		})
			.then((response) => {
				setPosts(response.data);
				console.log(response.data);
				setPostIsLoading(false);
			})
			.catch((err) => {
				setPostIsLoading(false);
			});
	};

	return (
		<Home
			handleGoProfile={handleGoProfile}
			handleGoAddPost={handleGoAddPost}
			posts={posts}
			postIsLoading={postIsLoading}
		/>
	);
};

export default HomePageController;
