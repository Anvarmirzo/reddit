import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';
import { Post } from '../../components/Feed/Post';

const PostPage = () => {
	const router = useRouter();
	const { data } = useQuery(GET_POST_BY_POST_ID, {
		variables: { post_id: router.query.postId },
	});

	const post: Post = data?.getPostListByPostId;
	return (
		<section className='mx-auto my-7 max-w-5xl'>
			<Post post={post} />
		</section>
	);
};

export default PostPage;
