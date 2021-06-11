"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.links = void 0;
function links(parent, args, context, info) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
}
exports.links = links;
//# sourceMappingURL=User.js.map