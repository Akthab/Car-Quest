import { useState } from 'react';
// material-ui
import {
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography,
	CircularProgress,
} from '@mui/material';

import { MdWavingHand } from 'react-icons/md';
// third party
import { FormikProvider } from 'formik';

import styles from '../../../style/login-view.module.css';

// project import
// import FirebaseSocial from './FirebaseSocial';
// import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

const LoginFormView = (props) => {
	const { formik, loginIsLoading, handleSignIn } = props;

	const [checked, setChecked] = useState(false);

	const { errors, touched, getFieldProps } = formik;

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = () => {
		console.log('SUBMIT');
	};

	return (
		<>
			<Typography className={styles.typography_style}>
				<MdWavingHand />
				Hey, Hello Welcome
			</Typography>
			<FormikProvider value={formik}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Stack spacing={1}>
							<InputLabel htmlFor='email-login'>Email Address</InputLabel>
							<OutlinedInput
								id='email'
								type='email'
								name='email'
								{...getFieldProps('email')}
								placeholder='Enter email address'
								fullWidth
								error={Boolean(touched.email && errors.email)}
							/>
							{touched.email && errors.email && (
								<FormHelperText
									error
									id='standard-weight-helper-text-email-login'
								>
									{errors.email}
								</FormHelperText>
							)}
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Stack spacing={1}>
							<InputLabel htmlFor='password-login'>Password</InputLabel>
							<OutlinedInput
								fullWidth
								error={Boolean(touched.password && errors.password)}
								id='password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								{...getFieldProps('password')}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
											size='large'
										>
											{showPassword ? (
												<EyeOutlined />
											) : (
												<EyeInvisibleOutlined />
											)}
										</IconButton>
									</InputAdornment>
								}
								placeholder='Enter password'
							/>
							{touched.password && errors.password && (
								<FormHelperText
									error
									id='standard-weight-helper-text-password-login'
								>
									{errors.password}
								</FormHelperText>
							)}
						</Stack>
					</Grid>

					<Grid item xs={12} sx={{ mt: -1 }}>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='center'
							spacing={2}
						>
							<FormControlLabel
								control={
									<Checkbox
										checked={checked}
										onChange={(event) => setChecked(event.target.checked)}
										name='checked'
										color='primary'
										size='small'
									/>
								}
								label={<Typography variant='body1'>Keep me sign in</Typography>}
							/>
						</Stack>
					</Grid>
					{errors.submit && (
						<Grid item xs={12}>
							<FormHelperText error>{errors.submit}</FormHelperText>
						</Grid>
					)}
					<Grid item xs={12}>
						{/* <AnimateButton> */}
						<Button
							id={'submit'}
							disabled={loginIsLoading || !(formik.isValid && formik.dirty)}
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							// className={classes.submitButon}
							onClick={handleSignIn}
							startIcon={loginIsLoading ? <CircularProgress size={15} /> : null}
						>
							Logins
						</Button>
						{/* </AnimateButton> */}
					</Grid>
					<Grid item xs={12}>
						<Divider>
							<Typography variant='caption'> Login with</Typography>
						</Divider>
					</Grid>
					<Grid item xs={12}>
						{/* <FirebaseSocial /> */}
					</Grid>
				</Grid>
			</FormikProvider>
		</>
	);
};

export default LoginFormView;
