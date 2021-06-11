"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.votes = exports.postedBy = void 0;
function postedBy(parent, args, context, info) {
    return context.prisma.link
        .findUnique({ where: { id: parent.id } })
        .postedBy();
}
exports.postedBy = postedBy;
function votes(parent, args, context) {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).votes();
}
exports.votes = votes;
//# sourceMappingURL=Link.js.map