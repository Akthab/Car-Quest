import { resizeImage } from './image_resizer';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import parse from 'html-react-parser';
import React from 'react';
import CropDialog from './crop-image/crop-dialog-box';

export const Dropzone = (props) => {
	const { setNewFile } = props;
	const [imagePreview, setImagePreview] = useState('');
	const [isFileDropped, setIsFileDropped] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [open, setOpen] = useState(false);
	const [cropImage, setCropImage] = useState('');

	const handleClose = (value) => {
		setOpen(false);
	};

	const validateFile = (file) => {
		const allowedTypes = ['image/jpeg', 'image/png'];
		if (!allowedTypes.includes(file.type)) {
			setErrorMessage('Only JPEG and PNG files are allowed');
			return false;
		}
		return true;
	};

	const onDrop = useCallback(async (acceptedFiles) => {
		setErrorMessage('');
		setIsFileDropped(true);
		const file = acceptedFiles[0];
		if (!validateFile(file)) {
			return;
		}

		// Resize the dropped image
		const resizedImageBlob = await resizeImage(file); // Adjust the maxWidth and maxHeight as needed

		// Create a new File object with the resized image
		const resizedImageFile = new File([resizedImageBlob], file.name, {
			type: file.type,
		});

		// Show the resized image preview
		const preview = URL.createObjectURL(resizedImageFile);

		// Convert the resized image file to a data URL
		const reader = new FileReader();
		reader.onload = () => {
			setOpen(true);
			setCropImage(reader.result?.toString() || '');
		};
		reader.readAsDataURL(resizedImageFile);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<>
			<CropDialog
				open={open}
				onClose={handleClose}
				cropImage={cropImage}
				setNewFile={setNewFile}
				setOpen={setOpen}
				setImagePreview={setImagePreview}
			/>
			<div
				{...getRootProps()}
				className='max-w-2xl  h-48 border-4 border-dashed border-gray-400 flex items-center justify-center mx-auto'
				style={{ backgroundColor: 'rgb(218, 255, 234)' }}
			>
				<div
					{...getRootProps()}
					className='w-full h-full flex items-center justify-center flex-col'
				>
					<input {...getInputProps()} />
					<AiOutlineCloudUpload className='w-12 h-12 text-gray-400 mb-2' />
					{isFileDropped ? (
						<p></p>
					) : isDragActive ? (
						<p className='text-gray-500'>Drop the files here</p>
					) : (
						<p className='text-gray-500'>
							Drag and drop files here or click to select files
						</p>
					)}

					{errorMessage && <p className='text-red-500'>{errorMessage}</p>}

					<div>
						{imagePreview && (
							<div style={{ width: 180, height: 180 }}>
								{parse(`<img src="${imagePreview}" alt="Dropped Image"/>`)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Dropzone;
