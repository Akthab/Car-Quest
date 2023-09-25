// `pages/_app.js`
import '../styles/globals.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	return (
		<QueryClientProvider client={queryClient}>
			<SnackbarProvider maxSnack={3}>
				<Component {...pageProps} />;
			</SnackbarProvider>
		</QueryClientProvider>
	);
}
