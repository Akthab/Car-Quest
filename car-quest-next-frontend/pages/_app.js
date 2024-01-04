// `pages/_app.js`
import '../styles/globals.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import 'react-image-crop/dist/ReactCrop.css';
import { persistor, store } from '../store/reduxStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	const Layout = Component.layout || (({ children }) => <>{children}</>);

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<SnackbarProvider maxSnack={3}>
					<PersistGate loading={null} persistor={persistor}>
						<Layout>
							<Component {...pageProps} />;
						</Layout>
					</PersistGate>
				</SnackbarProvider>
				<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
			</QueryClientProvider>
		</Provider>
	);
}
