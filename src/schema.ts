import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = importSchema('src/typeDefs/schema.graphql');

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});
