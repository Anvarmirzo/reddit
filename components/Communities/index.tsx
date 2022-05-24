import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SUBREDDITS_WITH_LIMIT } from '../../graphql/queries';
import { ISubreddit } from '../../models/interfaces';
import { SubredditRow } from './SubredditRow';

export const Communities = () => {
	const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
		variables: {
			limit: 10,
		},
	});

	const subreddits: ISubreddit[] = data?.getSubredditListByLimit;
	console.log(subreddits);
	const renderSubreddits = () => {
		return (
			<ol className='list-decimal'>
				{subreddits?.map((subreddit, i) => (
					<SubredditRow topic={subreddit.topic} index={i} key={subreddit.id} />
				))}
			</ol>
		);
	};

	return (
		<article className='sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline'>
			<h2 className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</h2>
			{renderSubreddits()}
		</article>
	);
};
