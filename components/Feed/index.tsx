import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../../graphql/queries';
import { Post } from './Post';

interface FeedProps {
	topic?: string;
}

export const Feed = ({ topic }: FeedProps) => {
	const { data, error } = topic
		? useQuery(GET_ALL_POSTS_BY_TOPIC, { variables: { topic } })
		: useQuery(GET_ALL_POSTS);

	const posts: Post[] = topic ? data?.getPostListByTopic : data?.getPostList;

	return (
		<main className='space-y- mt-5 space-y-4'>
			{posts?.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</main>
	);
};
