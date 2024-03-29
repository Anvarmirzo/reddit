import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

interface SearchFormProps {}

export const SearchForm = () => {
	return (
		<form className='flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1'>
			<SearchIcon className='h-6 w-6 text-gray-400' />
			<input
				className='flex-1 bg-transparent outline-none'
				type='text'
				placeholder='Search Reddit'
			/>
			<button hidden />
		</form>
	);
};
