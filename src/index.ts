import { send } from 'micro';
import { get, post, router } from 'microrouter';
import { ApolloServer, gql } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';

const mockData = [
  {
    director: 'Bryan Singer',
    title: 'Bohemian Rhapsody',
  },
  {
    director: 'Bob Persichetti',
    title: 'Spider-Man: Into the Spider-Verse',
  },
];

const typeDefs = gql`
  type Movie {
    title: String
    director: String
  }
  type Query {
    movies: [Movie]
  }
`;

const resolvers = {
  Query: { movies: () => mockData },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({ schema });
const graphqlPath = '/data';
const graphqlHandler = apolloServer.createHandler({ path: graphqlPath });

module.exports = router(
  get('/', (req, res) => 'Welcome!'),
  post(graphqlPath, graphqlHandler),
  get(graphqlPath, graphqlHandler),
  (_, res) => send(res, 404, 'Not Found'),
);
