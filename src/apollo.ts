import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_GRAPHQL_END_POINT,
    headers: {"x-hasura-admin-secret": import.meta.env.VITE_GRAPHQL_ADNIN_SECRET}
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});
export default apolloClient;
