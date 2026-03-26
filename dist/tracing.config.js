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
exports.TracingConfigService = void 0;
const core_1 = require("@hazeljs/core");
let TracingConfigService = class TracingConfigService {
    constructor() {
        this.config = this.loadDefaultConfig();
    }
    loadDefaultConfig() {
        return {
            serviceName: process.env.SERVICE_NAME || 'microservice',
            serviceVersion: process.env.SERVICE_VERSION || '1.0.0',
            samplingProbability: parseFloat(process.env.TRACE_SAMPLING || '1.0'),
            exporter: process.env.TRACE_EXPORTER || 'console',
            exporterEndpoint: process.env.TRACE_EXPORTER_ENDPOINT,
            headers: this.parseHeaders(process.env.TRACE_EXPORTER_HEADERS),
            environment: process.env.NODE_ENV || 'development'
        };
    }
    parseHeaders(headersString) {
        if (!headersString)
            return undefined;
        try {
            return JSON.parse(headersString);
        }
        catch {
            return undefined;
        }
    }
    getConfig() {
        return { ...this.config };
    }
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
    getServiceName() {
        return this.config.serviceName;
    }
    getServiceVersion() {
        return this.config.serviceVersion;
    }
    getSamplingProbability() {
        return this.config.samplingProbability;
    }
    getExporter() {
        return this.config.exporter;
    }
    getExporterEndpoint() {
        return this.config.exporterEndpoint;
    }
    getHeaders() {
        return this.config.headers;
    }
    getEnvironment() {
        return this.config.environment;
    }
    isProduction() {
        return this.config.environment === 'production';
    }
    shouldSample() {
        return Math.random() < this.config.samplingProbability;
    }
    createTraceContext() {
        return {
            traceId: this.generateId(),
            spanId: this.generateId(),
            baggage: {}
        };
    }
    generateId() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }
    extractTraceFromHeaders(headers) {
        const traceparent = headers['traceparent'] || headers['uber-trace-id'];
        if (!traceparent)
            return null;
        try {
            if (traceparent.startsWith('00-')) {
                const parts = traceparent.split('-');
                if (parts.length >= 4) {
                    return {
                        traceId: parts[1],
                        spanId: parts[2],
                        baggage: {}
                    };
                }
            }
        }
        catch (error) {
            console.error('Failed to extract trace context:', error);
        }
        return null;
    }
    injectTraceToHeaders(context) {
        return {
            'traceparent': `00-${context.traceId}-${context.spanId}-01`,
            ...this.config.headers
        };
    }
};
exports.TracingConfigService = TracingConfigService;
exports.TracingConfigService = TracingConfigService = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TracingConfigService);
