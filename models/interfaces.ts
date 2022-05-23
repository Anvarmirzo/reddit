export interface IComment {
	created_at: string;
	id: number;
	post_id: number;
	text: string;
	username: string;
}

export interface IVote {
	created_at: string;
	id: number;
	post_id: number;
	upvote: boolean;
	username: string;
}

export interface ISubreddit {
	created_at: string;
	id: number;
	topic: string;
}

export interface IPost {
	body: string;
	created_at: string;
	id: number;
	image: string;
	subreddit_id: number;
	title: string;
	username: string;
	votes: IVote[];
	comments: IComment[];
	subreddit: ISubreddit[];
}
