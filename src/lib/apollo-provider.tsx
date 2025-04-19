"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = new ApolloClient({
    uri: "/api/graphql", // Your GraphQL endpoint
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
