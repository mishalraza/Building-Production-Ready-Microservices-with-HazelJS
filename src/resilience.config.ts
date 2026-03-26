import { Injectable } from '@hazeljs/core';

interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

interface CircuitBreakerConfig {
  failureThreshold: number;
  resetTimeoutMs: number;
  monitoringPeriodMs: number;
}

interface TimeoutConfig {
  durationMs: number;
}

interface BulkheadConfig {
  maxConcurrent: number;
  maxQueue: number;
}

interface ResilienceConfig {
  retry: RetryConfig;
  circuitBreaker: CircuitBreakerConfig;
  timeout: TimeoutConfig;
  bulkhead: BulkheadConfig;
}

@Injectable()
export class ResilienceConfigService {
  private config: ResilienceConfig;

  constructor() {
    this.config = this.loadDefaultConfig();
  }

  private loadDefaultConfig(): ResilienceConfig {
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

  getConfig(): ResilienceConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<ResilienceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getRetryConfig(): RetryConfig {
    return { ...this.config.retry };
  }

  getCircuitBreakerConfig(): CircuitBreakerConfig {
    return { ...this.config.circuitBreaker };
  }

  getTimeoutConfig(): TimeoutConfig {
    return { ...this.config.timeout };
  }

  getBulkheadConfig(): BulkheadConfig {
    return { ...this.config.bulkhead };
  }

  setRetryConfig(config: Partial<RetryConfig>): void {
    this.config.retry = { ...this.config.retry, ...config };
  }

  setCircuitBreakerConfig(config: Partial<CircuitBreakerConfig>): void {
    this.config.circuitBreaker = { ...this.config.circuitBreaker, ...config };
  }

  setTimeoutConfig(config: Partial<TimeoutConfig>): void {
    this.config.timeout = { ...this.config.timeout, ...config };
  }

  setBulkheadConfig(config: Partial<BulkheadConfig>): void {
    this.config.bulkhead = { ...this.config.bulkhead, ...config };
  }
}