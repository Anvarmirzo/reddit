import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ApolloProvider } from '@apollo/client';
import { Header } from '../components';
import { client } from '../apollo-client';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={session}>
				<Toaster />
				<div className='h-screen overflow-y-auto bg-slate-200'>
					<Header />
					<Component {...pageProps} />
				</div>
			</SessionProvider>
		</ApolloProvider>
	);
}

export default MyApp;
