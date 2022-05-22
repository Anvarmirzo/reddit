import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface AvatarProps {
	seed?: string;
	large?: boolean;
}

export const Avatar = ({ seed, large }: AvatarProps) => {
	const { data: session } = useSession();

	return (
		<div
			className={`relative ${
				large ? 'h-20 w-20' : 'h-10 w-10'
			} overflow-hidden rounded-full border-gray-300 bg-white`}
		>
			<Image
				src={`https://avatars.dicebear.com/api/open-peeps/${
					seed || session?.user?.name || 'placeholder'
				}.svg`}
				layout='fill'
			/>
		</div>
	);
};
