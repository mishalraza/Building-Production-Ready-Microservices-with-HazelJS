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
exports.UserModule = void 0;
const core_1 = require("@hazeljs/core");
const discovery_1 = require("@hazeljs/discovery");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
    constructor() {
        new discovery_1.ServiceRegistry({
            name: 'user-service',
            port: 3001,
            healthCheckPath: '/health',
            metadata: {
                description: 'User management service',
                team: 'platform',
            },
        });
    }
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, core_1.Module)({
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
    }),
    __metadata("design:paramtypes", [])
], UserModule);
