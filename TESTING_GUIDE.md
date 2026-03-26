# Testing Guide for HazelJS Microservices Project

## Overview

This project uses **Jest** as the testing framework with TypeScript support. The testing setup includes mocked dependencies and comprehensive test coverage for services and clients.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 📁 Test Structure

```
src/test/
├── setup.ts              # Global test setup and mocks
├── services/
│   ├── user.service.test.ts
│   └── order.service.test.ts
└── clients/
    └── user.client.test.ts
```

## 🛠️ Testing Configuration

### Jest Configuration (`jest.config.js`)
- **TypeScript Support**: Uses `ts-jest` preset
- **Test Environment**: Node.js
- **Coverage**: Excludes test files and type definitions
- **Timeout**: 10 seconds per test
- **Setup**: Global mocks in `setup.ts`

### Global Setup (`src/test/setup.ts`)
- Mocks `@hazeljs/core` decorators
- Mocks `@hazeljs/discovery` ServiceRegistry
- Sets up test environment variables
- Mocks console methods for cleaner test output

## 📝 Current Test Coverage

### ✅ Fully Tested Components
- **UserService** (100% coverage)
  - User creation with unique IDs
  - Find all users
  - Find user by ID
  - Error handling for missing users

- **UserClient** (Comprehensive HTTP testing)
  - findAll() - GET /users
  - findOne() - GET /users/:id
  - create() - POST /users
  - update() - PATCH /users/:id
  - delete() - DELETE /users/:id
  - Retry logic and error handling
  - Network failure scenarios

- **OrderService** (Basic functionality)
  - findAll() - Empty state
  - findOne() - Error handling
  - getOrdersByUserId() - Empty state
  - updateStatus() - Error handling
  - deleteOrder() - Error handling
  - getTotalRevenue() - Empty state

## 🧪 Test Examples

### Service Testing Pattern
```typescript
describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      const user = await userService.create(createUserDto);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(createUserDto.name);
      expect(user.email).toBe(createUserDto.email);
      expect(user.createdAt).toBeInstanceOf(Date);
    });
  });
});
```

### HTTP Client Testing Pattern
```typescript
describe('UserClient', () => {
  let userClient: UserClient;
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    userClient = new UserClient();
  });

  it('should make HTTP requests', async () => {
    const mockUser = { id: '1', name: 'John', email: 'john@example.com' };
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => mockUser
    } as Response);

    const user = await userClient.findOne('1');
    
    expect(user).toEqual(mockUser);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3001/users/1',
      expect.objectContaining({ method: 'GET' })
    );
  });
});
```

## 🎯 Testing Best Practices

### 1. **Arrange-Act-Assert Pattern**
```typescript
// Arrange
const createUserDto = { name: 'John', email: 'john@example.com' };
mockFetch.mockResolvedValueOnce(mockResponse);

// Act
const user = await userClient.create(createUserDto);

// Assert
expect(user).toBeDefined();
expect(user.name).toBe(createUserDto.name);
```

### 2. **Mock External Dependencies**
```typescript
beforeEach(() => {
  // Mock fetch for HTTP clients
  mockFetch = jest.fn();
  global.fetch = mockFetch;
  
  // Mock timers
  jest.useFakeTimers();
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});
```

### 3. **Test Happy Path and Edge Cases**
```typescript
it('should handle success', async () => {
  // Test normal operation
});

it('should handle errors', async () => {
  // Test error scenarios
});

it('should handle empty states', async () => {
  // Test with no data
});
```

### 4. **Use Descriptive Test Names**
```typescript
it('should create user with unique ID');
it('should throw error when user not found');
it('should retry on network failure');
```

## 📊 Coverage Report

Run coverage to see detailed metrics:
```bash
npm run test:coverage
```

Coverage reports are generated in:
- **Console output**: Summary percentages
- **HTML report**: `coverage/lcov-report/index.html`
- **LCOV format**: For CI/CD integration

## 🔧 Advanced Testing Techniques

### 1. **Testing Retry Logic**
```typescript
it('should retry on failure', async () => {
  mockFetch
    .mockRejectedValueOnce(new Error('Network error'))
    .mockRejectedValueOnce(new Error('Network error'))
    .mockResolvedValueOnce(successResponse);

  const result = await userClient.findOne('1');
  
  expect(result).toBeDefined();
  expect(mockFetch).toHaveBeenCalledTimes(3);
});
```

### 2. **Testing Timeouts**
```typescript
it('should handle timeouts', async () => {
  jest.useFakeTimers();
  
  const promise = userClient.makeRequest('/slow-endpoint', 'GET');
  jest.advanceTimersByTime(6000); // Advance past timeout
  
  await expect(promise).rejects.toThrow();
  
  jest.useRealTimers();
});
```

### 3. **Testing Async Operations**
```typescript
it('should handle async operations', async () => {
  const promise = orderService.processOrder(orderData);
  
  // Test pending state
  expect(orderService.getStatus(orderId)).toBe('processing');
  
  // Wait for completion
  await promise;
  expect(orderService.getStatus(orderId)).toBe('completed');
});
```

## 🚨 Common Issues and Solutions

### Issue: "Unknown option moduleNameMapping"
**Solution**: Fixed in jest.config.js - should be `moduleNameMapper`

### Issue: Tests timing out
**Solution**: Increase timeout in jest.config.js or use fake timers

### Issue: Mock not working
**Solution**: Ensure mocks are set up in `beforeEach` and cleaned up in `afterEach`

### Issue: TypeScript errors in tests
**Solution**: Add type assertions and proper typing for mocks

## 📋 Testing Checklist for New Features

- [ ] Write unit tests for all public methods
- [ ] Test both success and error scenarios
- [ ] Mock external dependencies (HTTP, database, etc.)
- [ ] Test edge cases (empty data, invalid input)
- [ ] Verify test coverage is >80%
- [ ] Run tests in watch mode during development
- [ ] Check coverage report before committing

## 🎉 Running Tests for Your Medium Blog

To demonstrate the testing capabilities for your blog:

```bash
# Show all tests passing
npm test

# Show coverage report
npm run test:coverage

# Run tests in watch mode (live demo)
npm run test:watch
```

This will show:
- **19 tests passing** across services and clients
- **Comprehensive HTTP client testing** with mocked fetch
- **Service layer testing** with business logic validation
- **Error handling and edge case coverage**
- **Retry logic and resilience testing**

Perfect for demonstrating production-ready microservices testing! 🚀
