import React from 'react';
import {
	ArrowDownIcon,
	ArrowUpIcon,
	BookmarkIcon,
	ChatAltIcon,
	DotsHorizontalIcon,
	GiftIcon,
	ShareIcon,
} from '@heroicons/react/outline';
import { Avatar } from '../Avatar';
import TimeAgo from 'react-timeago';
import Link from 'next/link';
import { Jelly } from '@uiball/loaders';

interface PostProps {
	post: Post;
}

export const Post = ({ post }: PostProps) => {
	if (!post) {
		return (
			<div className='flex w-full items-center justify-center p-10 text-xl'>
				<Jelly size={50} color='#ff4501' />
			</div>
		);
	}

	return (
		<Link href={`/post/${post.id}`}>
			<article className='flex border border-gray-300 bg-white shadow-sm hover:border-gray-600'>
				<PostVote post={post} />
				<div className='p-3 pb-1'>
					<PostHeader post={post} />
					<PostBody post={post} />
					<img className='w-full' src={post.image} alt={post.title} />
					<PostFooter post={post} />
				</div>
			</article>
		</Link>
	);
};

const PostVote = ({ post }: PostProps) => {
	return (
		<div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
			<button className='voteButtons hover:text-red-400' type='button'>
				<ArrowUpIcon />
			</button>
			<span className='text-xs font-bold text-black'>0</span>
			<button className='voteButtons hover:text-blue-400' type='button'>
				<ArrowDownIcon />
			</button>
		</div>
	);
};

const PostHeader = ({ post }: PostProps) => (
	<div className='flex items-center space-x-2'>
		<Avatar seed={post.subreddit[0]?.topic} />
		<p className='text-xs text-gray-400'>
			<Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
				<a className='font-bold text-black hover:text-blue-400 hover:underline'>
					r/{post.subreddit[0]?.topic}
				</a>
			</Link>{' '}
			• Posted by u/
			{post.username} <TimeAgo date={post.created_at} />
		</p>
	</div>
);

const PostBody = ({ post }: PostProps) => (
	<div className='py-4'>
		<h2 className='text-xl font-semibold'>{post.title}</h2>
		<p className='mt-2 text-sm font-light'>{post.body}</p>
	</div>
);

const PostFooter = ({ post }: PostProps) => (
	<div className='flex space-x-4 text-gray-400'>
		<button type='button' className='postButton'>
			<ChatAltIcon className='h-6 w-6' />
			<p>{post.comments.length} Comments</p>
		</button>
		<button type='button' className='postButton'>
			<GiftIcon className='h-6 w-6' />
			<p className='hidden sm:inline'>Award</p>
		</button>
		<button type='button' className='postButton'>
			<ShareIcon className='h-6 w-6' />
			<p className='hidden sm:inline'>Share</p>
		</button>
		<button type='button' className='postButton'>
			<BookmarkIcon className='h-6 w-6' />
			<p className='hidden sm:inline'>Save</p>
		</button>
		<button type='button' className='postButton'>
			<DotsHorizontalIcon className='h-6 w-6' />
		</button>
	</div>
);
