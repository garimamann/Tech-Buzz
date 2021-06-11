"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.APP_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const APP_SECRET = "GraphQL-is-aw3some";
exports.APP_SECRET = APP_SECRET;
function getTokenPayload(token) {
    return jsonwebtoken_1.default.verify(token, APP_SECRET);
}
function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace("Bearer", "");
            if (!token) {
                throw new Error("No token found");
            }
            const userId = getTokenPayload(token);
            return userId;
        }
    }
    else if (authToken) {
        const userId = getTokenPayload(authToken);
        return userId;
    }
    throw new Error("Not authenticated");
}
exports.getUserId = getUserId;
//# sourceMappingURL=utils.js.map