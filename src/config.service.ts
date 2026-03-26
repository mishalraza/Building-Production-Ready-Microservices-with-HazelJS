import { Injectable } from '@hazeljs/core';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

interface AppConfig {
  database: DatabaseConfig;
  redis: RedisConfig;
  port: number;
  environment: string;
}

@Injectable()
export class ConfigService {
  private config: AppConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): AppConfig {
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

  get<T extends keyof AppConfig>(key: T): AppConfig[T] {
    return this.config[key];
  }

  getDatabaseConfig(): DatabaseConfig {
    return this.config.database;
  }

  getRedisConfig(): RedisConfig {
    return this.config.redis;
  }

  getPort(): number {
    return this.config.port;
  }

  getEnvironment(): string {
    return this.config.environment;
  }

  isDevelopment(): boolean {
    return this.config.environment === 'development';
  }

  isProduction(): boolean {
    return this.config.environment === 'production';
  }
}