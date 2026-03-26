import 'jest';

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.SERVICE_NAME = 'test-service';
  process.env.SERVICE_VERSION = '1.0.0-test';
});

afterAll(() => {
  delete process.env.NODE_ENV;
  delete process.env.SERVICE_NAME;
  delete process.env.SERVICE_VERSION;
});

jest.mock('@hazeljs/core', () => ({
  Injectable: () => (target: any) => target,
  Controller: () => (target: any) => target,
  Module: (options: any) => (target: any) => target,
  Get: (path?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {},
  Post: (path?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {},
  Put: (path?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {},
  Patch: (path?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {},
  Delete: (path?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {},
  Param: (param: string) => (target: any, propertyKey: string, parameterIndex: number) => {},
  Body: () => (target: any, propertyKey: string, parameterIndex: number) => {},
  Middleware: () => (target: any) => target,
}));

jest.mock('@hazeljs/discovery', () => ({
  ServiceRegistry: class ServiceRegistry {
    constructor(config: any) {
      console.log('Mock ServiceRegistry created with config:', config);
    }
  },
}));

global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
