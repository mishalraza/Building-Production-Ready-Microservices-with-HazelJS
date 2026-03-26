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
exports.ConfigService = void 0;
const core_1 = require("@hazeljs/core");
let ConfigService = class ConfigService {
    constructor() {
        this.config = this.loadConfig();
    }
    loadConfig() {
        return {
            database: {
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432'),
                username: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'password',
                database: process.env.DB_NAME || 'microservices'
            },
            redis: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
                password: process.env.REDIS_PASSWORD
            },
            port: parseInt(process.env.PORT || '3000'),
            environment: process.env.NODE_ENV || 'development'
        };
    }
    get(key) {
        return this.config[key];
    }
    getDatabaseConfig() {
        return this.config.database;
    }
    getRedisConfig() {
        return this.config.redis;
    }
    getPort() {
        return this.config.port;
    }
    getEnvironment() {
        return this.config.environment;
    }
    isDevelopment() {
        return this.config.environment === 'development';
    }
    isProduction() {
        return this.config.environment === 'production';
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
