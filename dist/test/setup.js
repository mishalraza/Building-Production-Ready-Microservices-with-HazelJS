"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
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
    Injectable: () => (target) => target,
    Controller: () => (target) => target,
    Module: (options) => (target) => target,
    Get: (path) => (target, propertyKey, descriptor) => { },
    Post: (path) => (target, propertyKey, descriptor) => { },
    Put: (path) => (target, propertyKey, descriptor) => { },
    Patch: (path) => (target, propertyKey, descriptor) => { },
    Delete: (path) => (target, propertyKey, descriptor) => { },
    Param: (param) => (target, propertyKey, parameterIndex) => { },
    Body: () => (target, propertyKey, parameterIndex) => { },
    Middleware: () => (target) => target,
}));
jest.mock('@hazeljs/discovery', () => ({
    ServiceRegistry: class ServiceRegistry {
        constructor(config) {
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
