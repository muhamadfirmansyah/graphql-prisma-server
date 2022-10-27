const { ApolloServer } = require('apollo-server');

/**
 * The typeDefs constant defines your GraphQL schema (more about this in a bit). Here, it defines a
 * simple Query type with one field called info. This field has the type String!. The exclamation
 * mark in the type definition means that this field is required and can never be null.
 */
const typeDefs = `
    type Query{
        info: String!
        feed: [Link!]!
    }

    type Mutation {
        post(url: String!, description: String!): Link!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`;

/**
 * The links variable is used to store the links at
 * runtime. For now, everything is stored only in-memory
 * rather than being persisted in a database.
 */
let links = [
  {
    id: 'link-0',
    url: 'google.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

/**
 * The resolvers object is the actual implementation of the GraphQL schema. Notice how its structure
 * is identical to the structure of the type definition inside typeDefs: Query.info.
 */

const resolvers = {
  Query: {
    info: () => 'This is the API of a backend',
    /**
     * You are adding a new resolver for the feed root
     * field. Notice that a resolver always has to be
     * named exactly after the corresponding field from
     * the schema definition.
     */
    feed: () => links
  },
  /**
   * Finally, you are adding three more resolvers for the
   * fields on the Link type from the schema definition.
   * We willl discuss what the parent argument that is
   * passed into the resolver here is in a bit.
   */
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url
  }
};

/**
 * Finally, the schema and resolvers are bundled and passed to ApolloServer which is imported from
 * apollo-server. This tells the server what API operations are accepted and how they should be
 * resolved.
 */
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
