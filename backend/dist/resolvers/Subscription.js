"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVote = exports.newLink = void 0;
function newLinkSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LINK");
}
const newLink = {
    subscribe: newLinkSubscribe,
    resolve: (payload) => {
        return payload;
    },
};
exports.newLink = newLink;
function newVoteSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_VOTE");
}
const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload;
    },
};
exports.newVote = newVote;
//# sourceMappingURL=Subscription.js.map