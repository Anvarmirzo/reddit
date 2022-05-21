import React from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export const Login = () => {
	/* Next auth hooks */
	const { data: session } = useSession();

	/* Handlers */
	const handleClick = () => (session ? signOut() : signIn());

	return (
		<button
			onClick={handleClick}
			className='hidden items-center space-x-2 border border-gray-100 p-2 lg:flex'
		>
			<div className='relative h-5 w-5 flex-shrink-0'>
				<Image
					src='https://links.papareact.com/23l'
					layout='fill'
					objectFit='contain'
					alt=''
				/>
			</div>
			{session ? (
				<>
					<div className='flex-1 text-xs'>
						<p className='truncate'>{session.user?.name}</p>
						<p className='text-gray-400'>1 Karma</p>
					</div>
					<ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400' />
				</>
			) : (
				<p className='text-gray-400'>Sign In</p>
			)}
		</button>
	);
};
