import { gql } from 'graphql-tag';
import prisma from '../../../../prisma/prisma';

// Schema definition
export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    name: String
  }

  type SonnyAngelProduct {
    id: String!
    series: String!
    year: Int
    name: String!
    listings: [Listing!]!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    sonnyAngelProducts: [SonnyAngelProduct!]!
    sonnyAngelProduct(id: String!): SonnyAngelProduct
  }


  type Mutation {
    createUser(email: String!, name: String): User!
    updateUser(id: String!, name: String): User!
    deleteUser(id: String!): User!
  }
`;

// Resolvers implementation (handle each field in the schema)
export const resolvers = {
    Query: {
        users: async () => {
            return await prisma.user.findMany();
        },
        user: async (_: unknown, args: { id: string }) => {
            return await prisma.user.findUnique({
                where: { id: args.id },
            });
        },
        sonnyAngelProducts: async () => {
          try {
            return await prisma.sonnyAngelProduct.findMany();
          } catch (error) {
            console.error("GraphQL Error in sonnyAngelProducts:", error);
            throw new Error("Internal server error");
          };

        },

        
    },
    Mutation: {
        createUser: async (_: unknown, args: { email: string; name?: string }) => {
            return await prisma.user.create({
                data: {
                    email: args.email,
                    name: args.name || '',
                    username: args.email.split('@')[0],
                },
            });
        },
        updateUser: async (_: unknown, args: { id: string; name?: string }) => {
            return await prisma.user.update({
                where: { id: args.id },
                data: { name: args.name },
            });
        },
        deleteUser: async (_: unknown, args: { id: string }) => {
            return await prisma.user.delete({
                where: { id: args.id },
            });
        },
    },
};