import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';
import { useSession } from 'next-auth/react';
import { Comment, CommentForm, FeedPost } from '../../components';
import { IPost } from '../../models/interfaces';

const PostPage = () => {
	const router = useRouter();

	const { data: session } = useSession();

	const { data } = useQuery(GET_POST_BY_POST_ID, {
		variables: { post_id: router.query.postId },
	});

	const post: IPost = data?.getPostListByPostId;

	const renderComments = () => {
		return post?.comments.map((comment) => (
			<Comment comment={comment} key={comment.id} />
		));
	};
	return (
		<section className='mx-auto my-7 max-w-5xl'>
			<FeedPost post={post} />

			<div className='rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16'>
				<p className='text-sm'>
					Comment as <span className='text-red-500'>{session?.user?.name}</span>
				</p>
				<CommentForm session={session} postId={router.query.postId as string} />
			</div>

			<div className='-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10'>
				<hr className='py-2' />
				{renderComments()}
			</div>
		</section>
	);
};

export default PostPage;
