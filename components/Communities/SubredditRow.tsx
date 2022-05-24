import React from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import { Avatar } from '../Avatar';
import Link from 'next/link';

interface SubredditRowProps {
	topic: string;
	index: number;
}

export const SubredditRow = ({ topic, index }: SubredditRowProps) => {
	return (
		<li className='flex list-inside items-center space-x-2 border-t bg-white px-4 py-2'>
			<span>{index + 1}</span>
			<ChevronUpIcon className='h-4 w-4 flex-shrink-0 text-green-400' />
			<Avatar seed={`/subreddit/${topic}`} />
			<p className='flex-1 truncate'>r/{topic}</p>
			<Link href={`/subreddit/${topic}`}>
				<div className='cursor-pointer rounded-full bg-blue-500 px-3 text-white'>
					View
				</div>
			</Link>
		</li>
	);
};
