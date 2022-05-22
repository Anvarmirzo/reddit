import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar } from '../Avatar';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../../graphql/mutations';
import { client } from '../../apollo-client';
import { GET_SUBREDDIT_BY_TOPIC } from '../../graphql/queries';
import { toast } from 'react-hot-toast';

type FormData = {
	postTitle: string;
	postBody: string;
	postImage: string;
	subreddit: string;
};

export const PostBox = () => {
	const [isImageBoxOpen, setIsImageBoxOpen] = useState(false);
	const [addPost] = useMutation(ADD_POST);
	const [addSubreddit] = useMutation(ADD_SUBREDDIT);

	const { data: session } = useSession();

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const toggleImageBox = () => setIsImageBoxOpen(!isImageBoxOpen);

	const onSubmit = handleSubmit(async (formData) => {
		const notification = toast.loading('Creating new post...');
		try {
			let subredditId = '';
			const {
				data: { getSubredditListByTopic },
			} = await client.query({
				query: GET_SUBREDDIT_BY_TOPIC,
				variables: {
					topic: formData.subreddit,
				},
			});

			if (getSubredditListByTopic.length > 0) {
				subredditId = getSubredditListByTopic[0].id;
			} else {
				const { data } = await addSubreddit({
					variables: { topic: formData.subreddit },
				});

				subredditId = data.insertSubreddit.id;
			}

			const {
				data: { insertPost: newPost },
			} = await addPost({
				variables: {
					body: formData.postBody,
					title: formData.postTitle,
					image: formData.postImage || '',
					subreddit_id: subredditId,
					username: session?.user?.name,
				},
			});

			for (let field in formData) {
				setValue(field as keyof FormData, '');
			}
			toast.success('New post created!', {
				id: notification,
			});
		} catch (e) {
			console.log(e);
			toast.error('Something went wrong!', {
				id: notification,
			});
		}
	});

	return (
		<form
			onSubmit={onSubmit}
			className='sticky top-16 z-10 rounded-md border border-gray-300 bg-white p-2'
		>
			<div className='flex items-center space-x-3'>
				<Avatar />
				<input
					{...register('postTitle', { required: true })}
					type='text'
					disabled={!session}
					placeholder={
						session ? 'Create a post by entering a title!' : 'Sign in to post'
					}
					className='flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none'
				/>
				<button onClick={toggleImageBox} type='button'>
					<PhotographIcon
						className={`h-6 cursor-pointer ${
							isImageBoxOpen ? 'text-blue-300' : 'text-gray-300'
						}`}
					/>
				</button>
				<LinkIcon className='h-6 text-gray-300' />
			</div>
			{!!watch('postTitle') && (
				<div className='flex flex-col py-2'>
					<div className='flex items-center px-2'>
						<label htmlFor='postBody' className='min-w-[90px]'>
							Body:
						</label>
						<input
							className='m-2 flex-1 bg-blue-50 p-2 outline-none'
							type='text'
							id='postBody'
							placeholder='Text (optional)'
							{...register('postBody')}
						/>
					</div>
					<div className='flex items-center px-2'>
						<label htmlFor='subreddit' className='min-w-[90px]'>
							Subreddit:
						</label>
						<input
							className='m-2 flex-1 bg-blue-50 p-2 outline-none'
							type='text'
							id='subreddit'
							placeholder='i.e. reactjs'
							{...register('subreddit', { required: true })}
						/>
					</div>
					{isImageBoxOpen && (
						<div className='flex items-center px-2'>
							<label htmlFor='postImage' className='min-w-[90px]'>
								Image URL:
							</label>
							<input
								className='m-2 flex-1 bg-blue-50 p-2 outline-none'
								type='text'
								id='postImage'
								placeholder='Optional...'
								{...register('postImage')}
							/>
						</div>
					)}
					{Object.keys(errors).length > 0 && (
						<div className='space-y-2 p-2 text-red-500'>
							{errors.postTitle?.type === 'required' && (
								<p>- A Post Title is required.</p>
							)}
							{errors.subreddit?.type === 'required' && (
								<p>- A Subreddit is required.</p>
							)}
						</div>
					)}
					<button className='rounded-full bg-blue-400 p-2 text-white'>
						Create Post
					</button>
				</div>
			)}
		</form>
	);
};
