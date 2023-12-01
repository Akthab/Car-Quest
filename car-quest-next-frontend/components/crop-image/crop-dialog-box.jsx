import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CropImageView from './crop-image-view';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';

const CropDialog = (props) => {
	const {
		onClose,
		selectedValue,
		open,
		cropImage,
		setNewFile,
		setOpen,
		setImagePreview,
	} = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value) => {
		onClose(value);
	};

	return (
		<Dialog fullScreen onClose={handleClose} open={open}>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
						Crop Image
					</Typography>
					<IconButton
						edge='start'
						color='inherit'
						onClick={handleClose}
						aria-label='close'
					>
						<Close />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DialogTitle>
				Use the simple cropping tool to adjust the composition of your photo
				before submitting it. To eliminate unnecessary distractions and
				concentrate on the key components of your photo, just drag and resize
				the cropping frame. Make sure your photo is properly framed and prepared
				to leave an impact.
			</DialogTitle>
			<CropImageView
				cropImage={cropImage}
				setNewFile={setNewFile}
				setOpen={setOpen}
				setImagePreview={setImagePreview}
			/>
		</Dialog>
	);
};

export default CropDialog;
