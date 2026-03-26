import { Injectable } from '@hazeljs/core';

interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  labels?: Record<string, string>;
}

interface CounterMetric extends MetricData {
  type: 'counter';
}

interface GaugeMetric extends MetricData {
  type: 'gauge';
}

interface HistogramMetric extends MetricData {
  type: 'histogram';
  buckets: number[];
}

type Metric = CounterMetric | GaugeMetric | HistogramMetric;

@Injectable()
export class MetricsService {
  private metrics: Map<string, Metric> = new Map();
  private histogramBuckets: Map<string, number[]> = new Map();

  constructor() {
    this.initializeDefaultMetrics();
  }

  private initializeDefaultMetrics(): void {
    this.histogramBuckets.set('request_duration', [0.1, 0.5, 1, 2, 5, 10]);
  }

  incrementCounter(name: string, value: number = 1, labels?: Record<string, string>): void {
    const key = this.createKey(name, labels);
    const existing = this.metrics.get(key);
    
    if (existing && existing.type === 'counter') {
      existing.value += value;
      existing.timestamp = Date.now();
    } else {
      const metric: CounterMetric = {
        name,
        type: 'counter',
        value,
        timestamp: Date.now(),
        labels
      };
      this.metrics.set(key, metric);
    }
  }

  setGauge(name: string, value: number, labels?: Record<string, string>): void {
    const key = this.createKey(name, labels);
    const metric: GaugeMetric = {
      name,
      type: 'gauge',
      value,
      timestamp: Date.now(),
      labels
    };
    this.metrics.set(key, metric);
  }

  recordHistogram(name: string, value: number, labels?: Record<string, string>): void {
    const key = this.createKey(name, labels);
    const existing = this.metrics.get(key);
    
    if (existing && existing.type === 'histogram') {
      existing.value += value;
      existing.timestamp = Date.now();
    } else {
      const buckets = this.histogramBuckets.get(name) || [0.1, 0.5, 1, 2, 5, 10];
      const metric: HistogramMetric = {
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

  getMetric(name: string, labels?: Record<string, string>): Metric | undefined {
    const key = this.createKey(name, labels);
    return this.metrics.get(key);
  }

  getAllMetrics(): Metric[] {
    return Array.from(this.metrics.values());
  }

  getMetricsByName(name: string): Metric[] {
    return this.getAllMetrics().filter(metric => metric.name === name);
  }

  reset(): void {
    this.metrics.clear();
  }

  private createKey(name: string, labels?: Record<string, string>): string {
    if (!labels || Object.keys(labels).length === 0) {
      return name;
    }
    
    const labelString = Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}="${value}"`)
      .join(',');
    
    return `${name}{${labelString}}`;
  }

  getPrometheusFormat(): string {
    const lines: string[] = [];
    
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
}