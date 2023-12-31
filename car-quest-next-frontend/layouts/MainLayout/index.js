import { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
// import navigation from 'menu-items';
// import Breadcrumbs from 'components/@extended/Breadcrumbs';

// types
import { openDrawer } from '../../store/slice/menuSlice';
import React from 'react';
import Header from './Header';
import Profile from '../../pages/profile';

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout({ children }) {
	const theme = useTheme();
	const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
	const dispatch = useDispatch();

	// @ts-ignore
	const { drawerOpen } = useSelector((state) => state.menu);

	// drawer toggler
	const [open, setOpen] = useState(drawerOpen);
	const handleDrawerToggle = () => {
		setOpen(!open);
		dispatch(openDrawer({ drawerOpen: !open }));
	};

	// set media wise responsive drawer
	useEffect(() => {
		setOpen(true);
		dispatch(openDrawer({ drawerOpen: !matchDownLG }));
	}, []);

	useEffect(() => {
		if (open !== drawerOpen) setOpen(drawerOpen);
	}, [drawerOpen]);

	return (
		<Box sx={{ display: 'flex', width: '100%' }}>
			<Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
			<Header open={open} handleDrawerToggle={handleDrawerToggle} />
			<Box
				component='main'
				sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
			>
				<Toolbar />
				{children}
				{/* <Profile /> */}
				{/* <Toolbar /> */}
				{/* <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} /> */}
				{/* <Outlet /> */}
			</Box>
		</Box>
	);
}

// export default MainLayout;
