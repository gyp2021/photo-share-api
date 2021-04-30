// const { GraphQLScalarType } = require('graphql');

const { argsToArgsConfig } = require("graphql/type/definition");
const authorizeWithGithub = require('./auth');

const resolvers = {
  Query: {
    me: (parent, args, { currentUser }) => currentUser,
    totalUsers: (parent, args, { db }) => db.collection('users').estimatedDocumentCount(),
    allUsers: (parent, args, { db }) => db.collection('users').find().toArray(),
    totalPhotos: (parent, args, { db }) => db.collection('photos').estimatedDocumentCount(),
    allPhotos: (parent, args, { db }) => db.collection('photos').find().toArray(),
  },
  Mutation: {
    postPhoto: (parent, args, { db }) => {
      db.collection('photos').insertOne({
        ...args.input,
      }).then(result => console.log(result));

      return {};
    },
    githubAuth: async (parent, { code }, { db }) => {
      const { CLIENT_ID, CLIENT_SECRET } = process.env;
      const {
        message,
        access_token,
        avatar_url,
        login,
        name,
      } = await authorizeWithGithub({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      });

      if (message) {
        throw new Error(message);
      }

      const latestUserInfo = {
        name,
        githubLogin: login,
        githubToken: access_token,
        avatar: avatar_url,
      };

      const {
        ops: [user]
      } = await db.collection('users').replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });

      return { user, token: access_token };
    },
  },
  // Photo: {
    // url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
    // postedBy: (parent) => users.find(u => u.githubLogin === parent.githubUser),
    // taggedUsers: (parent) => tags.filter(t => t.photoID === parent.id)
    //   .map(t => t.userID)
    //   .map(userID => users.find(u => u.githubLogin === userID)),
  // },
  // User: {
    // postedPhotos: (parent) => photos.filter(p => p.githubUser === parent.githubLogin),
    // inPhotos: (parent) => tags.filter(t => t.userID === parent.githubLogin)
    //   .map(t => t.photoID)
    //   .map(photoID => photos.find(p => p.id === photoID)),
  // },
  // DateTime: new GraphQLScalarType({
  //   name: 'DateTime',
  //   description: 'DateTime custom scalar type',
  //   serialize: (value) => new Date(value).toISOString(),
  //   parseValue: (value) => new Date(value),
  //   parseLiteral: (ast) => ast.value,
  // }),
};

module.exports = resolvers;
