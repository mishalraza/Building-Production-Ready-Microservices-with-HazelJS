import { Injectable } from '@hazeljs/core';

interface TracingConfig {
  serviceName: string;
  serviceVersion: string;
  samplingProbability: number;
  exporter: 'console' | 'jaeger' | 'zipkin' | 'otlp';
  exporterEndpoint?: string;
  headers?: Record<string, string>;
  environment: string;
}

interface TraceContext {
  traceId: string;
  spanId: string;
  baggage?: Record<string, string>;
}

@Injectable()
export class TracingConfigService {
  private config: TracingConfig;

  constructor() {
    this.config = this.loadDefaultConfig();
  }

  private loadDefaultConfig(): TracingConfig {
    return {
      serviceName: process.env.SERVICE_NAME || 'microservice',
      serviceVersion: process.env.SERVICE_VERSION || '1.0.0',
      samplingProbability: parseFloat(process.env.TRACE_SAMPLING || '1.0'),
      exporter: (process.env.TRACE_EXPORTER as any) || 'console',
      exporterEndpoint: process.env.TRACE_EXPORTER_ENDPOINT,
      headers: this.parseHeaders(process.env.TRACE_EXPORTER_HEADERS),
      environment: process.env.NODE_ENV || 'development'
    };
  }

  private parseHeaders(headersString?: string): Record<string, string> | undefined {
    if (!headersString) return undefined;
    
    try {
      return JSON.parse(headersString);
    } catch {
      return undefined;
    }
  }

  getConfig(): TracingConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<TracingConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getServiceName(): string {
    return this.config.serviceName;
  }

  getServiceVersion(): string {
    return this.config.serviceVersion;
  }

  getSamplingProbability(): number {
    return this.config.samplingProbability;
  }

  getExporter(): string {
    return this.config.exporter;
  }

  getExporterEndpoint(): string | undefined {
    return this.config.exporterEndpoint;
  }

  getHeaders(): Record<string, string> | undefined {
    return this.config.headers;
  }

  getEnvironment(): string {
    return this.config.environment;
  }

  isProduction(): boolean {
    return this.config.environment === 'production';
  }

  shouldSample(): boolean {
    return Math.random() < this.config.samplingProbability;
  }

  createTraceContext(): TraceContext {
    return {
      traceId: this.generateId(),
      spanId: this.generateId(),
      baggage: {}
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  extractTraceFromHeaders(headers: Record<string, string>): TraceContext | null {
    const traceparent = headers['traceparent'] || headers['uber-trace-id'];
    
    if (!traceparent) return null;

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
    } catch (error) {
      console.error('Failed to extract trace context:', error);
    }

    return null;
  }

  injectTraceToHeaders(context: TraceContext): Record<string, string> {
    return {
      'traceparent': `00-${context.traceId}-${context.spanId}-01`,
      ...this.config.headers
    };
  }
}