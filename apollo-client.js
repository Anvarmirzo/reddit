import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'https://kabul.stepzen.net/api/kneeling-opossum/__graphql',
	headers: {
		Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
	},
	cache: new InMemoryCache(),
});
