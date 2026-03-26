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
exports.MetricsService = void 0;
const core_1 = require("@hazeljs/core");
let MetricsService = class MetricsService {
    constructor() {
        this.metrics = new Map();
        this.histogramBuckets = new Map();
        this.initializeDefaultMetrics();
    }
    initializeDefaultMetrics() {
        this.histogramBuckets.set('request_duration', [0.1, 0.5, 1, 2, 5, 10]);
    }
    incrementCounter(name, value = 1, labels) {
        const key = this.createKey(name, labels);
        const existing = this.metrics.get(key);
        if (existing && existing.type === 'counter') {
            existing.value += value;
            existing.timestamp = Date.now();
        }
        else {
            const metric = {
                name,
                type: 'counter',
                value,
                timestamp: Date.now(),
                labels
            };
            this.metrics.set(key, metric);
        }
    }
    setGauge(name, value, labels) {
        const key = this.createKey(name, labels);
        const metric = {
            name,
            type: 'gauge',
            value,
            timestamp: Date.now(),
            labels
        };
        this.metrics.set(key, metric);
    }
    recordHistogram(name, value, labels) {
        const key = this.createKey(name, labels);
        const existing = this.metrics.get(key);
        if (existing && existing.type === 'histogram') {
            existing.value += value;
            existing.timestamp = Date.now();
        }
        else {
            const buckets = this.histogramBuckets.get(name) || [0.1, 0.5, 1, 2, 5, 10];
            const metric = {
                name,
                type: 'histogram',
                value,
                timestamp: Date.now(),
                labels,
                buckets
            };
            this.metrics.set(key, metric);
        }
    }
    getMetric(name, labels) {
        const key = this.createKey(name, labels);
        return this.metrics.get(key);
    }
    getAllMetrics() {
        return Array.from(this.metrics.values());
    }
    getMetricsByName(name) {
        return this.getAllMetrics().filter(metric => metric.name === name);
    }
    reset() {
        this.metrics.clear();
    }
    createKey(name, labels) {
        if (!labels || Object.keys(labels).length === 0) {
            return name;
        }
        const labelString = Object.entries(labels)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}="${value}"`)
            .join(',');
        return `${name}{${labelString}}`;
    }
    getPrometheusFormat() {
        const lines = [];
        for (const metric of this.metrics.values()) {
            const labelString = metric.labels
                ? `{${Object.entries(metric.labels)
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(',')}}`
                : '';
            lines.push(`# TYPE ${metric.name} ${metric.type}`);
            lines.push(`${metric.name}${labelString} ${metric.value} ${metric.timestamp}`);
        }
        return lines.join('\n');
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MetricsService);
