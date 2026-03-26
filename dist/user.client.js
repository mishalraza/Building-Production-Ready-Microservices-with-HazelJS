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
exports.UserClient = void 0;
const core_1 = require("@hazeljs/core");
let UserClient = class UserClient {
    constructor() {
        this.config = {
            baseUrl: process.env.USER_SERVICE_URL || 'http://localhost:3001',
            timeout: parseInt(process.env.USER_SERVICE_TIMEOUT || '5000'),
            retries: parseInt(process.env.USER_SERVICE_RETRIES || '3')
        };
    }
    async findAll() {
        return this.makeRequest('/users', 'GET');
    }
    async findOne(id) {
        return this.makeRequest(`/users/${id}`, 'GET');
    }
    async create(createUserDto) {
        return this.makeRequest('/users', 'POST', createUserDto);
    }
    async update(id, updateUserDto) {
        return this.makeRequest(`/users/${id}`, 'PATCH', updateUserDto);
    }
    async delete(id) {
        await this.makeRequest(`/users/${id}`, 'DELETE');
    }
    async makeRequest(path, method, body) {
        const url = `${this.config.baseUrl}${path}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        };
        let lastError;
        for (let attempt = 1; attempt <= this.config.retries; attempt++) {
            try {
                const response = await this.fetchWithTimeout(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return await response.json();
                }
                else {
                    return undefined;
                }
            }
            catch (error) {
                lastError = error instanceof Error ? error : new Error('Unknown error');
                if (attempt === this.config.retries) {
                    throw lastError;
                }
                await this.delay(Math.pow(2, attempt - 1) * 1000);
            }
        }
        throw lastError;
    }
    async fetchWithTimeout(url, options) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        }
        catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    getConfig() {
        return { ...this.config };
    }
};
exports.UserClient = UserClient;
exports.UserClient = UserClient = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserClient);
