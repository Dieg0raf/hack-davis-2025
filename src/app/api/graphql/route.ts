import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { typeDefs, resolvers } from "./index"

// /api/graphql/route.ts - receives the HTTP request 
// and passes it to the Apollo Server for processing.

// Create the Apollo Server (to handle GraphQL requests)
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Apollo Server validates requests and sends them to the appropriate resolver.
// The resolver is responsible for fetching the data and returning it to the client.


// Create the API route handler
const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };