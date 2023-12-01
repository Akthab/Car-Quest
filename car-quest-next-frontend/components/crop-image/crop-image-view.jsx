import React, { useState, useRef, useEffect } from 'react';

import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { canvasPreview } from './components/canvasPreview';
import { useDebounceEffect } from './components/useDebounceEffect';

import 'react-image-crop/dist/ReactCrop.css';
import { Button, Slider, Box, Typography, Grid, Input } from '@mui/material';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: '%',
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	);
}

const CropImageView = (props) => {
	const { cropImage, setNewFile, setOpen, setImagePreview } = props;

	const [imgSrc, setImgSrc] = useState('');
	const previewCanvasRef = useRef(null);
	const imgRef = useRef(null);
	const blobUrlRef = useRef('');
	const [crop, setCrop] = useState(null);
	const [completedCrop, setCompletedCrop] = useState(null);
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [aspect, setAspect] = useState(1);

	const handleSliderChange = (event, newValue) => {
		setScale(newValue);
	};

	const handleInputChange = (event) => {
		setScale(event.target.value === '' ? 0 : Number(event.target.value));
	};

	const handleSliderRotateChange = (event, newValue) => {
		setRotate(newValue);
	};

	const handleInputRotateChange = (event) => {
		setRotate(Math.min(180, Math.max(-180, Number(event.target.value))));
	};

	useEffect(() => {
		setImgSrc(cropImage.toString() || '');
	});

	function onImageLoad(e) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	async function onConfirmCropClick() {
		const image = imgRef.current;
		const previewCanvas = previewCanvasRef.current;
		if (!image || !previewCanvas || !completedCrop) {
			throw new Error('Crop canvas does not exist');
		}

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		const offscreen = new OffscreenCanvas(
			completedCrop.width * scaleX,
			completedCrop.height * scaleY
		);
		const ctx = offscreen.getContext('2d');
		if (!ctx) {
			throw new Error('No 2d context');
		}

		ctx.drawImage(
			previewCanvas,
			0,
			0,
			previewCanvas.width,
			previewCanvas.height,
			0,
			0,
			offscreen.width,
			offscreen.height
		);

		const blob = await offscreen.convertToBlob({
			type: 'image/png',
		});

		const file = new File([blob], 'cropped-image.png', { type: 'image/png' });

		if (!file) {
			throw new Error('File creation failed');
		}

		setNewFile(file);
		if (blobUrlRef.current) {
			URL.revokeObjectURL(blobUrlRef.current);
		}

		setImagePreview(URL.createObjectURL(blob));
		blobUrlRef.current = URL.createObjectURL(blob);

		setOpen(false);
	}

	// Used to update the canvas when the dependencies change
	useDebounceEffect(
		async () => {
			console.log('Inside the useDebounce Effect');
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					scale,
					rotate
				);
			}
		},
		100,
		[completedCrop, scale, rotate]
	);

	return (
		<div className='App' style={{ padding: '40px' }}>
			<div
				className='Crop-Controls'
				style={{ display: 'flex', gap: 40, marginBottom: 40 }}
			>
				<div>
					<Box sx={{ width: 250 }}>
						<Typography
							id='input-slider'
							gutterBottom
							style={{ fontWeight: 700, fontSize: 24 }}
						>
							Scale
						</Typography>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs>
								<Slider
									value={typeof scale === 'number' ? scale : 0}
									onChange={handleSliderChange}
									aria-labelledby='input-slider'
									step={0.1}
									min={0.5}
									max={3}
								/>
							</Grid>
							<Grid item>
								<Input
									value={scale}
									size='small'
									onChange={handleInputChange}
									style={{ width: 52 }}
									// onBlur={handleBlur}
									inputProps={{
										step: 0.1,
										min: 0.5,
										max: 3,
										type: 'number',
										'aria-labelledby': 'input-slider',
									}}
								/>
							</Grid>
						</Grid>
					</Box>
				</div>
				<div>
					<Box sx={{ width: 250 }}>
						<Typography
							id='input-slider'
							gutterBottom
							style={{ fontWeight: 700, fontSize: 24 }}
						>
							Rotate
						</Typography>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs>
								<Slider
									value={typeof rotate === 'number' ? rotate : 0}
									onChange={handleSliderRotateChange}
									aria-labelledby='input-slider'
									defaultValue={0}
									min={-180}
									max={180}
								/>
							</Grid>
							<Grid item>
								<Input
									value={rotate}
									size='small'
									onChange={handleInputRotateChange}
									style={{ width: 52 }}
									inputProps={{
										type: 'number',
										'aria-labelledby': 'input-slider',
									}}
								/>
							</Grid>
						</Grid>
					</Box>
				</div>
			</div>
			<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
				{!!imgSrc && (
					<ReactCrop
						crop={crop}
						onChange={(_, percentCrop) => setCrop(percentCrop)}
						onComplete={(c) => setCompletedCrop(c)}
						aspect={aspect}
						minHeight={200}
						style={{ maxHeight: '600px' }}
					>
						<img
							ref={imgRef}
							alt='Crop me'
							src={imgSrc}
							style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
							onLoad={onImageLoad}
						/>
					</ReactCrop>
				)}
				{!!completedCrop && (
					<div>
						<div>
							<canvas
								ref={previewCanvasRef}
								style={{
									border: '1px solid black',
									objectFit: 'contain',
									width: '300px',
									height: '300px',
								}}
							/>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								style={{
									backgroundColor: '#4f4fd3',
									padding: '18px',
									color: 'white',
									marginTop: '20px',
									fontWeight: '700',
									textTransform: 'none',
									fontSize: '16px',
								}}
								onClick={onConfirmCropClick}
							>
								Confirm Crop
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CropImageView;
