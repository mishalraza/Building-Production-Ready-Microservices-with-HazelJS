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
exports.ResilienceConfigService = void 0;
const core_1 = require("@hazeljs/core");
let ResilienceConfigService = class ResilienceConfigService {
    constructor() {
        this.config = this.loadDefaultConfig();
    }
    loadDefaultConfig() {
        return {
            retry: {
                maxAttempts: 3,
                initialDelayMs: 1000,
                maxDelayMs: 10000,
                backoffMultiplier: 2
            },
            circuitBreaker: {
                failureThreshold: 5,
                resetTimeoutMs: 30000,
                monitoringPeriodMs: 60000
            },
            timeout: {
                durationMs: 5000
            },
            bulkhead: {
                maxConcurrent: 10,
                maxQueue: 100
            }
        };
    }
    getConfig() {
        return { ...this.config };
    }
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
    getRetryConfig() {
        return { ...this.config.retry };
    }
    getCircuitBreakerConfig() {
        return { ...this.config.circuitBreaker };
    }
    getTimeoutConfig() {
        return { ...this.config.timeout };
    }
    getBulkheadConfig() {
        return { ...this.config.bulkhead };
    }
    setRetryConfig(config) {
        this.config.retry = { ...this.config.retry, ...config };
    }
    setCircuitBreakerConfig(config) {
        this.config.circuitBreaker = { ...this.config.circuitBreaker, ...config };
    }
    setTimeoutConfig(config) {
        this.config.timeout = { ...this.config.timeout, ...config };
    }
    setBulkheadConfig(config) {
        this.config.bulkhead = { ...this.config.bulkhead, ...config };
    }
};
exports.ResilienceConfigService = ResilienceConfigService;
exports.ResilienceConfigService = ResilienceConfigService = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ResilienceConfigService);
