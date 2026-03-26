"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const core_1 = require("@hazeljs/core");
let AuthMiddleware = class AuthMiddleware {
    async use(context, next) {
        const token = context.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }
        try {
            const decoded = this.verifyToken(token);
            context.user = {
                id: decoded.sub,
                username: decoded.email,
                role: 'user'
            };
            return next();
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
    verifyToken(token) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token format');
        }
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            throw new Error('Token expired');
        }
        return payload;
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, core_1.Injectable)()
], AuthMiddleware);
