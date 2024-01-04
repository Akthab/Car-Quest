import PropTypes from 'prop-types';

// material-ui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import React from 'react';

import SimpleBar from 'simplebar-react';

// third-party
import { BrowserView, MobileView } from 'react-device-detect';
import { blue, blueGrey } from '@mui/material/colors';

// root style
const RootStyle = styled(BrowserView)({
	flexGrow: 1,
	height: '100%',
	overflow: 'hidden',
});

// scroll bar wrapper

const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
	maxHeight: '100%',
	'& .simplebar-scrollbar': {
		'&:before': {
			backgroundColor: alpha(blueGrey[400], 0.48),
		},
		'&.simplebar-visible:before': {
			opacity: 1,
		},
	},
	'& .simplebar-track.simplebar-vertical': {
		width: 10,
	},
	'& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
		height: 6,
	},
	'& .simplebar-mask': {
		zIndex: 'inherit',
	},
}));

// ==============================|| SIMPLE SCROLL BAR  ||============================== //

export default function SimpleBarScroll({ children, sx, ...other }) {
	return (
		<>
			<RootStyle>
				<SimpleBarStyle
					// @ts-ignore
					timeout={500}
					clickOnTrack={false}
					sx={sx}
					{...other}
				>
					{children}
				</SimpleBarStyle>
			</RootStyle>
			<MobileView>
				<Box sx={{ overflowX: 'auto', ...sx }} {...other}>
					{children}
				</Box>
			</MobileView>
		</>
	);
}

SimpleBarScroll.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.object,
};
