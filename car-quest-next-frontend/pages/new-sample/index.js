// @ts-nocheck
import { Typography } from '@mui/material';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import MainCard from '../../components/MainCard';

import { styled } from '@mui/material/styles';

export default function NewSample() {
	const IFrameWrapper = styled('iframe')(() => ({
		height: 'calc(100vh - 210px)',
		border: 'none',
	}));

	return (
		<>
			{/* <div className='flex flex-wrap'>
				<div className='w-full px-4'>
					<div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'> */}
			<MainCard title='View Posts'>
				<IFrameWrapper
					title='Ant Icon'
					width='100%'
					src='https://ant.design/components/icon/'
				/>
			</MainCard>
			{/* <Typography className='mt-40'> Hello World</Typography> */}
			{/* <MapExample /> */}
			{/* </div>
				</div>
			</div> */}
		</>
	);
}

NewSample.layout = MainLayout;
