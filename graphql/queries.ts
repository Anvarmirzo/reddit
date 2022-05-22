import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
	query MyQuery {
		getPostList {
			id
			title
			image
			subreddit_id
			created_at
			username
			body
			comments {
				id
				created_at
				username
				text
				post_id
			}
			subreddit {
				id
				created_at
				topic
			}
			votes {
				id
				username
				upvote
				post_id
				created_at
			}
		}
	}
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
	query MyQuery($topic: String!) {
		getSubredditListByTopic(topic: $topic) {
			created_at
			id
			topic
		}
	}
`;
