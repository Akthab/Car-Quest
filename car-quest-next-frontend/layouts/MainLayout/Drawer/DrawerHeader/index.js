import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip, Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
// import Logo from 'components/Logo';
import React from 'react';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
	const theme = useTheme();

	return (
		// only available in paid version
		<DrawerHeaderStyled theme={theme} open={open}>
			<Stack direction='row' spacing={1} alignItems='center'>
				{/* <Logo /> */}
				<Typography>Car Quest</Typography>
			</Stack>
		</DrawerHeaderStyled>
	);
};

DrawerHeader.propTypes = {
	open: PropTypes.bool,
};

export default DrawerHeader;
