import type { NextPage } from 'next';
import Head from 'next/head';
import { Communities, Feed, PostBox } from '../components';

const Home: NextPage = () => {
	return (
		<div className='my-7 mx-auto max-w-5xl'>
			<Head>
				<title>Reddit Clone</title>
			</Head>
			<PostBox />
			<div className='flex'>
				<Feed />
				<Communities />
			</div>
		</div>
	);
};

export default Home;
