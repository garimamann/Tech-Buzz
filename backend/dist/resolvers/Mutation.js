"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updatePost = exports.deletePost = exports.vote = exports.post = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
function vote(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = utils_1.getUserId(context).userId;
        const vote = yield context.prisma.vote.findUnique({
            where: {
                linkId_userId: {
                    linkId: Number(args.linkId),
                    userId: userId,
                },
            },
        });
        if (Boolean(vote)) {
            throw new Error(`Already voted for link: ${args.linkId}`);
        }
        const newVote = context.prisma.vote.create({
            data: {
                user: { connect: { id: userId } },
                link: { connect: { id: Number(args.linkId) } },
            },
        });
        context.pubsub.publish("NEW_VOTE", newVote);
        return newVote;
    });
}
exports.vote = vote;
function deletePost(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = utils_1.getUserId(context);
        const link = yield context.prisma.link.delete({
            where: {
                id: Number(args.linkid),
            },
        });
        return link;
    });
}
exports.deletePost = deletePost;
function deleteUser(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = utils_1.getUserId(context);
        const user = yield context.prisma.user.delete({
            where: {
                id: Number(args.userId),
            },
        });
        return user;
    });
}
exports.deleteUser = deleteUser;
function updatePost(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = utils_1.getUserId(context);
        console.log(args.linkId);
        const link = yield context.prisma.link.update({
            where: {
                id: Number(args.linkId),
            },
            data: {
                description: args.description,
                url: args.url,
            },
        });
        return link;
    });
}
exports.updatePost = updatePost;
function post(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = utils_1.getUserId(context).userId;
        const newLink = yield context.prisma.link.create({
            data: {
                url: args.url,
                description: args.description,
                postedBy: { connect: { id: userId } },
            },
        });
        context.pubsub.publish("NEW_LINK", newLink);
        return newLink;
    });
}
exports.post = post;
function signup(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcryptjs_1.default.hash(args.password, 10);
        const user = yield context.prisma.user.create({
            data: Object.assign(Object.assign({}, args), { password }),
        });
        const token = jsonwebtoken_1.default.sign({ userID: user.id }, utils_1.APP_SECRET);
        return { token, user };
    });
}
exports.signup = signup;
function login(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield context.prisma.user.findUnique({
            where: { email: args.email },
        });
        if (!user) {
            throw new Error("No such user found");
        }
        const valid = yield bcryptjs_1.default.compare(args.password, user.password);
        if (!valid) {
            throw new Error("Invalid password");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.APP_SECRET);
        return {
            token,
            user,
        };
    });
}
exports.login = login;
//# sourceMappingURL=Mutation.js.map