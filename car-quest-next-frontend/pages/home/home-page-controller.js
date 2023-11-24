import Home from './home-page-view';
import React, { useEffect } from 'react';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { getUserDetailsByHeader, login } from '../../utils/authenticationUtil';

const HomePageController = () => {
	// @ts-ignore
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	useEffect(() => {
		getUserDetailsByHeader();
	});

	const handleGoProfile = () => {
		router.push('/profile');
	};

	const handleGoAddPost = () => {
		router.push('/add-post');
	};

	return (
		<Home handleGoProfile={handleGoProfile} handleGoAddPost={handleGoAddPost} />
	);
};

export default HomePageController;
