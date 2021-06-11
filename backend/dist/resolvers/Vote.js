"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.link = void 0;
function link(parent, args, context) {
    return context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
}
exports.link = link;
function user(parent, args, context) {
    return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
}
exports.user = user;
//# sourceMappingURL=Vote.js.map