"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const core_1 = require("@hazeljs/core");
let UserService = class UserService {
    constructor() {
        this.users = [];
    }
    async findAll() {
        return this.users;
    }
    async findOne(id) {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async create(createUserDto) {
        const user = {
            id: Math.random().toString(36).substring(7),
            name: createUserDto.name,
            email: createUserDto.email,
            createdAt: new Date()
        };
        this.users.push(user);
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, core_1.Injectable)()
], UserService);
