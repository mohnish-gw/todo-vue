import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
		);

	if (networkError) {
		let refreshtoken = localStorage.getItem(
			"realm-web:app(application-0-qrgsr):user(62163639b3d86aa50c82cbf7):refreshToken",
		);
		const requestOptions = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${refreshtoken}`,
			},
		};
		fetch("https://realm.mongodb.com/api/client/v2.0/auth/session", requestOptions)
			.then((response) => response.json())
			.then((data) => localStorage.setItem("token", data.access_token));
	}
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
});
const httpLink = new HttpLink({
	uri: "https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-qrgsr/graphql",
});
const newlink = authLink.concat(httpLink);
export const apolloClient = new ApolloClient({
	link: errorLink.concat(newlink),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network",
			errorPolicy: "all",
		},
	},
});
