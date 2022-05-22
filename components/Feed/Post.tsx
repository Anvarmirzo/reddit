import React from 'react';

interface PostProps {
	post: Post;
}

export const Post = ({ post }: PostProps) => {
	return <article>Post</article>;
};
