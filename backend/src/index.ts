import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils";
import * as Query from "./resolvers/Query";
import * as Mutation from "./resolvers/Mutation";
import * as User from "./resolvers/User";
import * as Link from "./resolvers/Link";
import * as Vote from "./resolvers/Vote";

import * as Subscription from "./resolvers/Subscription";

const { PubSub } = require('apollo-server')

const pubsub = new PubSub()

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
  Vote
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req, "") : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`server is running on ${url}`));
