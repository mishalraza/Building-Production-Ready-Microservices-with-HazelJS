import { Injectable } from '@hazeljs/core';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface CreateUserDto {
  name: string;
  email: string;
}

interface UserClientConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

@Injectable()
export class UserClient {
  private config: UserClientConfig;

  constructor() {
    this.config = {
      baseUrl: process.env.USER_SERVICE_URL || 'http://localhost:3001',
      timeout: parseInt(process.env.USER_SERVICE_TIMEOUT || '5000'),
      retries: parseInt(process.env.USER_SERVICE_RETRIES || '3')
    };
  }

  async findAll(): Promise<User[]> {
    return this.makeRequest<User[]>('/users', 'GET');
  }

  async findOne(id: string): Promise<User> {
    return this.makeRequest<User>(`/users/${id}`, 'GET');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.makeRequest<User>('/users', 'POST', createUserDto);
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    return this.makeRequest<User>(`/users/${id}`, 'PATCH', updateUserDto);
  }

  async delete(id: string): Promise<void> {
    await this.makeRequest<void>(`/users/${id}`, 'DELETE');
  }

  private async makeRequest<T>(
    path: string, 
    method: string, 
    body?: any
  ): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    let lastError: Error;
    
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await response.json() as T;
        } else {
          return undefined as T;
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt === this.config.retries) {
          throw lastError;
        }
        
        await this.delay(Math.pow(2, attempt - 1) * 1000);
      }
    }

    throw lastError!;
  }

  private async fetchWithTimeout(
    url: string, 
    options: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateConfig(config: Partial<UserClientConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): UserClientConfig {
    return { ...this.config };
  }
}