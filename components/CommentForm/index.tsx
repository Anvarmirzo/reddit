import React from 'react';
import { Session } from 'next-auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../graphql/mutations';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';
import { toast } from 'react-hot-toast';

interface CommentFormProps {
	session: Session | null;
	postId: string;
}

type FormData = {
	comment: string;
};

export const CommentForm = ({ session, postId }: CommentFormProps) => {
	const [addComment] = useMutation(ADD_COMMENT, {
		refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
	});
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log(data);
		const notification = toast.loading('Posting your comment...');

		await addComment({
			variables: {
				post_id: postId,
				username: session?.user?.name,
				text: data.comment,
			},
		});

		setValue('comment', '');
		toast.success('Comment successfully posted!', { id: notification });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2'>
			<textarea
				{...register('comment', { required: true })}
				disabled={!session}
				placeholder={
					session ? 'What are your thoughts?' : 'Please sign in to comment'
				}
				className='h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50'
			/>
			<button className='rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200'>
				Comment
			</button>
		</form>
	);
};
