const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;

const typeDefs = require('fs').readFileSync('./typeDefs.graphql', 'UTF-8');
const resolvers = require('./resolvers');

const { MongoClient } = require('mongodb');
require('dotenv').config();

async function start() {
  const app = express();
  const MONGO_DB = process.env.DB_HOST;

  const client= await MongoClient.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const githubToken = req.headers.authorization;
      const currentUser = await db.collection('users').findOne({ githubToken });
      return { db, currentUser };
    },
  });
  server.applyMiddleware({ app });

  app.get('/', (req, res) => res.end('PhotoShare API: Weldome!'));
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
  app.listen({ port: 4000 }, () => console.log('Server listen 4000'));
}

start();
