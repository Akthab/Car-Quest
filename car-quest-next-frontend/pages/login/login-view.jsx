import React from 'react';
import styles from './login-view.module.css';
import LoginFormController from './components/login-form/login-form-controller';
import { Grid } from '@mui/material';

export default function LoginView() {
	return (
		<Grid container className={styles.screen}>
			<Grid
				item
				// xs={6}
				sm={6}
				className={styles.left_half}
				sx={{ display: { xs: 'none', sm: 'flex' } }}
			>
				<div className={styles.information_cont}>
					<h1 className={styles.font_style}>
						Stay Ahead of Repairs: Optimize Vehicle Performance With Our
						Maintainence App
					</h1>
				</div>
			</Grid>
			<Grid item xs={12} sm={6} className={styles.right_half}>
				<div className={styles.login_cont}>
					<LoginFormController />
				</div>
			</Grid>
		</Grid>
	);
}
