const { GraphQLScalarType } = require('graphql');
const { users, photos, tags } = require('./data.js');

let _id = 5;

const resolvers = {
  Query: {
    photoCount: () => photos.length,
    photos: () => photos,
    users: () => users,
  },
  Mutation: {
    postPhoto: (parent, args) => {
      const newPhoto = {
        id: _id ++,
        ...args.input,
        created: new Date(),
      };
      photos.push(newPhoto);

      return newPhoto;
    },
  },
  Photo: {
    url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
    postedBy: (parent) => users.find(u => u.githubLogin === parent.githubUser),
    taggedUsers: (parent) => tags.filter(t => t.photoID === parent.id)
      .map(t => t.userID)
      .map(userID => users.find(u => u.githubLogin === userID)),
  },
  User: {
    postedPhotos: (parent) => photos.filter(p => p.githubUser === parent.githubLogin),
    inPhotos: (parent) => tags.filter(t => t.userID === parent.githubLogin)
      .map(t => t.photoID)
      .map(photoID => photos.find(p => p.id === photoID)),
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime custom scalar type',
    serialize: (value) => new Date(value).toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => ast.value,
  }),
};

module.exports = resolvers;
