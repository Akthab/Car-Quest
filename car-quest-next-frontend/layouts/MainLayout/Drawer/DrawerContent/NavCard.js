// material-ui
import { Button, CardMedia, Link, Stack, Typography } from '@mui/material';

// project import
import MainCard from '../../../../components/MainCard';

// assets
// import avatar from 'assets/images/users/avatar-group.png';
// import AnimateButton from 'components/@extended/AnimateButton';
import React from 'react';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => (
	// @ts-ignore
	<MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
		<Stack alignItems='center' spacing={2.5}>
			{/* <CardMedia component='img' image={avatar} sx={{ width: 112 }} /> */}
			<Stack alignItems='center'>
				<Typography variant='h5'>Car Quest</Typography>
				<Typography variant='h6' color='secondary'>
					New features coming soon
				</Typography>
			</Stack>
		</Stack>
	</MainCard>
);

export default NavCard;
