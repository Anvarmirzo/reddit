import React from 'react';
import Image from 'next/image';
import { ChevronDownIcon, HomeIcon } from '@heroicons/react/solid';
import { SearchForm } from '../SearchForm';
import { Login } from '../Login';
import {
	BellIcon,
	ChatIcon,
	GlobeIcon,
	MenuIcon,
	PlusIcon,
	SparklesIcon,
	SpeakerphoneIcon,
	VideoCameraIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';

export const Header = () => {
	return (
		<header className='sticky top-0 z-10 flex items-center bg-white px-4 py-2 shadow-sm'>
			<div className='relative h-10 w-20 flex-shrink-0'>
				<Link href='/'>
					<a>
						<Image
							src='https://links.papareact.com/fqy'
							layout='fill'
							objectFit='contain'
							alt=''
						/>
					</a>
				</Link>
			</div>
			<div className='mx-7 flex items-center xl:min-w-[300px]'>
				<HomeIcon className='h-5 w-5' />
				<p className='ml-2 hidden flex-1 lg:inline'>Home</p>
				<ChevronDownIcon className='h-5 w-5' />
			</div>
			<SearchForm />
			<div className='mx-5 flex hidden items-center space-x-2 text-gray-500 lg:inline-flex'>
				<SparklesIcon className='icon' />
				<GlobeIcon className='icon' />
				<VideoCameraIcon className='icon' />
				<hr className='h-10 border border-gray-100' />
				<ChatIcon className='icon' />
				<BellIcon className='icon' />
				<PlusIcon className='icon' />
				<SpeakerphoneIcon className='icon' />
			</div>
			<div className='ml-5 flex items-center lg:hidden'>
				<MenuIcon className='icon' />
			</div>
			<Login />
		</header>
	);
};
