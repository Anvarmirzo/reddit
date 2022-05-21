import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Reddit Clone</title>
			</Head>
			<Header />
		</div>
	);
};

export default Home;
