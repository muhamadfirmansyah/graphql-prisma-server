const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');

let links = [
  {
    id: 'link-0',
    url: 'google.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

const resolvers = {
  Query: {
    info: () => 'This is the API of a backend',
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };

      links.push(link);

      return link;
    },
    deleteLink: (parent, args) => {
      let id = args.id;

      links = links.filter((item) => item.id != id);

      return
    }
  }
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
