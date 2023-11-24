import React from 'react';
import styles from './login-view.module.css';
import LoginFormController from './components/login-form/login-form-controller';

export default function LoginView() {
	return (
		<div className={styles.screen}>
			<div className={styles.left_half}>
				<div className={styles.information_cont}>
					<h1 className={styles.font_style}>
						Stay Ahead of Repairs: Optimize Vehicle Performance With Our
						Maintainence App
					</h1>
				</div>
			</div>
			<div className={styles.right_half}>
				<div className={styles.login_cont}>
					<LoginFormController />
				</div>
			</div>
		</div>
	);
}
