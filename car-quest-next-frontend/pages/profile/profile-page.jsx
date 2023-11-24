import {
	Avatar,
	Badge,
	Button,
	Grid,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography,
	styled,
} from '@mui/material';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import styles from './profile-page.module.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useSelector } from 'react-redux';
import Dropzone from '../../components/drop_zone';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 22,
	height: 22,
	border: `2px solid ${theme.palette.background.paper}`,
}));

const ProfilePage = (props) => {
	const { handleChangePhoto, changePhoto } = props;
	const [value, setValue] = useState();

	// @ts-ignore
	const userDetails = useSelector((state) => state.user.userDetails);

	return (
		<div className={styles.card_style}>
			<div className='w-full h-full flex items-center justify-center flex-col'>
				{/* <Badge
					overlap='circular'
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					badgeContent={
						<SmallAvatar alt='Remy Sharp'>
							<FiEdit2 style={{ width: 12, height: 12 }} />
						</SmallAvatar>
					}
				> */}

				{changePhoto ? (
					<Avatar sx={{ width: 156, height: 156 }}>
						<FaUserCircle style={{ width: 140, height: 140 }} />
					</Avatar>
				) : (
					<Dropzone />
				)}
				<Button
					variant='contained'
					onClick={handleChangePhoto}
					className='bg-blue-500'
				>
					{changePhoto ? 'Change Photo' : 'Cancel'}
				</Button>
				{/* </Badge> */}
			</div>
			<Grid container spacing={4}>
				<Grid item xs={4}>
					<Stack spacing={1}>
						<InputLabel htmlFor='email-login'>First Name</InputLabel>
						<OutlinedInput
							id='email'
							type='email'
							name='email'
							value={userDetails.firstName}
							// placeholder='Enter email address'
							fullWidth
							size='small'
						/>
					</Stack>
				</Grid>
				<Grid item xs={4}>
					<Stack spacing={1}>
						<InputLabel htmlFor='password-login'>Last Name</InputLabel>
						<OutlinedInput
							fullWidth
							id='password'
							name='password'
							size='small'
							value={userDetails.lastName}
							// placeholder='Enter password'
						/>
					</Stack>
				</Grid>
				<Grid item xs={8}>
					<Stack spacing={1}>
						<InputLabel htmlFor='email-login'>Email Address</InputLabel>
						<OutlinedInput
							id='email'
							type='email'
							name='email'
							value={userDetails.email}
							// placeholder='Enter email address'
							fullWidth
							size='small'
						/>
					</Stack>
				</Grid>
				<Grid item xs={8}>
					<Stack spacing={1}>
						<InputLabel htmlFor='email-login'>Phone Number</InputLabel>
						<PhoneInput
							style={{
								border: '2px solid rgba(196,196,196)',
								padding: '10px',
							}}
							placeholder='Enter phone number'
							value={userDetails.phoneNumber}
							// @ts-ignore
							onChange={setValue}
						/>
					</Stack>
				</Grid>
			</Grid>
		</div>
	);
};

export default ProfilePage;
