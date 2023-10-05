import React, { useState } from 'react';
import ProfilePage from './profile-page';

const ProfilePageController = () => {
	const [changePhoto, setChangePhoto] = useState(false);

	const handleChangePhoto = () => {
		console.log('In the handle change photo');
		setChangePhoto(!changePhoto);
	};

	const handleCancelChangePhoto = () => {};
	return (
		<ProfilePage
			// @ts-ignore
			changePhoto={changePhoto}
			handleChangePhoto={handleChangePhoto}
		/>
	);
};

export default ProfilePageController;
