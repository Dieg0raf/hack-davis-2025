import { gql } from 'graphql-tag';
import prisma from '../../../../prisma/prisma';

// Schema definition
export const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    name: String
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(email: String!, name: String): User!
    updateUser(id: Int!, name: String): User!
    deleteUser(id: Int!): User!
  }
`;

// Resolvers implementation (handle each field in the schema)
export const resolvers = {
    Query: {
        users: async () => {
            return await prisma.user.findMany();
        },
        user: async (_: unknown, args: { id: number }) => {
            return await prisma.user.findUnique({
                where: { id: args.id },
            });
        },
    },
    Mutation: {
        createUser: async (_: unknown, args: { email: string; name?: string }) => {
            return await prisma.user.create({
                data: {
                    email: args.email,
                    name: args.name || '',
                },
            });
        },
        updateUser: async (_: unknown, args: { id: number; name?: string }) => {
            return await prisma.user.update({
                where: { id: args.id },
                data: { name: args.name },
            });
        },
        deleteUser: async (_: unknown, args: { id: number }) => {
            return await prisma.user.delete({
                where: { id: args.id },
            });
        },
    },
};