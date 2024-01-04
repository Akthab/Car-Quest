import Home from './home-page-view';
import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsByHeader } from '../../utils/authenticationUtil';
import { backendAuth } from '../../axios/instance/BaseAxios';
import { persistor } from '../../store/reduxStore';
import { userLogout } from '../../store/slice/userSlice';

const HomePageController = () => {
	// @ts-ignore
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const [posts, setPosts] = useState([]);
	const [postIsLoading, setPostIsLoading] = useState(false);
	const [isLoadingPage, setIsLoadingPage] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isLoggedIn) {
			router.replace('/login');
			// return null;
		} else {
			setIsLoadingPage(false);
			getUserDetailsByHeader();
			getAllPosts();
		}
	}, [isLoggedIn]);

	const handleGoProfile = () => {
		router.push('/profile');
	};

	const handleGoAddPost = () => {
		router.push('/add-post');
	};

	const handleLogOut = () => {
		persistor.purge().then(() => {
			// After purging, you might want to dispatch additional actions or navigate to the login page
			dispatch(userLogout());
			router.push('/login');
		});
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

	return isLoadingPage ? null : (
		<Home
			handleGoProfile={handleGoProfile}
			handleGoAddPost={handleGoAddPost}
			posts={posts}
			postIsLoading={postIsLoading}
			handleLogOut={handleLogOut}
		/>
	);
};

export default HomePageController;
