"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGrpcController = void 0;
const core_1 = require("@hazeljs/core");
const user_service_1 = require("./user.service");
let UserGrpcController = class UserGrpcController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(request) {
        const user = await this.userService.create(request);
        return { user };
    }
    async getUser(request) {
        const user = await this.userService.findOne(request.id);
        return { user };
    }
    async listUsers(request) {
        const users = await this.userService.findAll();
        return {
            users,
            total: users.length
        };
    }
    async updateUser(request) {
        const user = await this.userService.findOne(request.id);
        if (request.name) {
            user.name = request.name;
        }
        if (request.email) {
            user.email = request.email;
        }
        return { user };
    }
    async deleteUser(request) {
        try {
            await this.userService.findOne(request.id);
            return { success: true };
        }
        catch (error) {
            return { success: false };
        }
    }
};
exports.UserGrpcController = UserGrpcController;
exports.UserGrpcController = UserGrpcController = __decorate([
    (0, core_1.Controller)('grpc'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserGrpcController);
