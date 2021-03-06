"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const utils_1 = require("./utils");
const Query = __importStar(require("./resolvers/Query"));
const Mutation = __importStar(require("./resolvers/Mutation"));
const User = __importStar(require("./resolvers/User"));
const Link = __importStar(require("./resolvers/Link"));
const Vote = __importStar(require("./resolvers/Vote"));
const Subscription = __importStar(require("./resolvers/Subscription"));
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Subscription,
    Vote
};
const prisma = new client_1.PrismaClient();
const server = new apollo_server_1.ApolloServer({
    typeDefs: fs_1.default.readFileSync(path_1.default.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: ({ req }) => {
        return Object.assign(Object.assign({}, req), { prisma,
            pubsub, userId: req && req.headers.authorization ? utils_1.getUserId(req, "") : null });
    },
});
server.listen().then(({ url }) => console.log(`server is running on ${url}`));
//# sourceMappingURL=index.js.map