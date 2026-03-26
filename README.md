# Building-Production-Ready-Microservices-with-HazelJS

A comprehensive microservices implementation built with **HazelJS** framework, demonstrating production-ready patterns including service discovery, resilience patterns, distributed tracing, and comprehensive testing.

## 🚀 Features

- **Service Discovery** - Automatic service registration and discovery with HazelJS ServiceRegistry
- **Resilience Patterns** - Circuit breakers, retries, and timeout handling
- **Distributed Tracing** - OpenTelemetry integration for end-to-end tracing
- **Health Checks** - Comprehensive health monitoring endpoints
- **REST & gRPC** - Dual protocol support for maximum flexibility
- **Comprehensive Testing** - 19+ tests with Jest, mocking, and coverage reports
- **TypeScript** - Full type safety and modern development experience
- **Metrics & Monitoring** - Built-in metrics collection and exposure

## 📁 Project Structure

```
src/
├── app.module.ts              # Main application module
├── gateway.module.ts          # API Gateway configuration
├── controllers/
│   ├── user.controller.ts    # REST API endpoints
│   ├── user.grpc.controller.ts # gRPC service implementation
│   └── health.controller.ts  # Health check endpoints
├── services/
│   ├── user.service.ts        # Business logic layer
│   ├── order.service.ts       # Order management
│   ├── metrics.service.ts     # Metrics collection
│   └── config.service.ts      # Configuration management
├── clients/
│   └── user.client.ts         # HTTP client with retry logic
├── middleware/
│   └── auth.middleware.ts     # Authentication middleware
├── config/
│   ├── tracing.config.ts      # Distributed tracing setup
│   └── resilience.config.ts   # Resilience patterns configuration
└── test/                      # Comprehensive test suite
    ├── setup.ts               # Global test configuration
    ├── services/              # Service layer tests
    └── clients/               # Client layer tests
```

## 🛠️ Tech Stack

- **Framework**: HazelJS (Node.js microservices framework)
- **Language**: TypeScript 5.6+
- **Testing**: Jest with ts-jest
- **Service Discovery**: HazelJS ServiceRegistry
- **Resilience**: HazelJS Resilience
- **Tracing**: OpenTelemetry
- **Build**: TypeScript Compiler
- **Linting**: ESLint with TypeScript support

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hazeljs-microservices.git
cd hazeljs-microservices

# Install dependencies
npm install

# Build the project
npm run build

# Start the application
npm start
```

### Development

```bash
# Run in development mode with hot reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📊 Available Services

### User Service (Port 3001)
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Health Service
- `GET /health/health` - Service health status
- `GET /health/ready` - Readiness probe
- `GET /health/live` - Liveness probe

### gRPC Service
- User management operations via gRPC protocol
- Port: 3002 (configurable)

## 🔧 Configuration

### Environment Variables

```bash
# Service Configuration
SERVICE_NAME=user-service
SERVICE_PORT=3001
SERVICE_HOST=localhost

# Health Check
HEALTH_CHECK_PATH=/health

# Tracing
OTEL_SERVICE_NAME=user-service
OTEL_EXPORTER_JAEGER_ENDPOINT=http://localhost:14268/api/traces

# Resilience
CIRCUIT_BREAKER_THRESHOLD=5
RETRY_ATTEMPTS=3
TIMEOUT_MS=5000
```

### Service Registry Configuration

Services automatically register with the ServiceRegistry on startup:

```typescript
new ServiceRegistry({
  name: 'user-service',
  port: 3001,
  healthCheckPath: '/health',
  metadata: {
    description: 'User management service',
    team: 'platform',
  },
});
```

## 🧪 Testing

This project includes a comprehensive test suite with **19+ tests** covering:

- **Unit Tests**: Service layer business logic
- **Integration Tests**: HTTP client operations
- **Mock Tests**: External dependencies
- **Error Handling**: Network failures, timeouts
- **Resilience**: Retry logic, circuit breakers

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Test Coverage

- **UserService**: 100% coverage
- **UserClient**: HTTP operations, retry logic, error handling
- **OrderService**: CRUD operations, business logic
- **Overall**: >80% coverage target

## 📈 Monitoring & Observability

### Metrics

The application exposes metrics at `/metrics` endpoint:

- HTTP request counts and durations
- Custom business metrics
- System resource usage
- Error rates and types

### Distributed Tracing

OpenTelemetry integration provides:

- Request tracing across service boundaries
- Performance bottleneck identification
- Error tracking and correlation
- Service dependency mapping

### Health Checks

Comprehensive health monitoring:

- **Health**: Overall service status
- **Readiness**: Service ready to accept traffic
- **Liveness**: Service is running properly

## 🔄 Resilience Patterns

### Circuit Breaker

```typescript
// Automatic circuit breaking on failures
@CircuitBreaker({
  threshold: 5,
  timeout: 60000,
  resetTimeout: 30000,
})
```

### Retry Logic

```typescript
// Automatic retry with exponential backoff
@Retry({
  attempts: 3,
  delay: 1000,
  backoff: 'exponential',
})
```

### Timeout Handling

```typescript
// Request timeout protection
@Timeout(5000)
```

## 🚀 Deployment

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3001
CMD ["node", "dist/app.module.js"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  user-service:
    build: .
    ports:
      - "3001:3001"
    environment:
      - SERVICE_NAME=user-service
      - SERVICE_PORT=3001
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Ensure >80% test coverage
- Use conventional commit messages
- Update documentation as needed

## 📝 API Documentation

### REST API

#### Users Endpoints

```http
GET    /users           # List all users
GET    /users/:id       # Get user by ID
POST   /users           # Create user
PATCH  /users/:id       # Update user
DELETE /users/:id       # Delete user
```

#### Request/Response Examples

**Create User**
```json
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response**
```json
{
  "id": "abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### gRPC API

Service definition for user management operations with protobuf messages.

## 🐛 Troubleshooting

### Common Issues

**Service Discovery Not Working**
- Check ServiceRegistry configuration
- Verify network connectivity
- Ensure health endpoints are accessible

**Tests Failing**
- Run `npm install` to ensure dependencies
- Check Jest configuration in `jest.config.js`
- Verify test setup in `src/test/setup.ts`

**Build Errors**
- Ensure TypeScript configuration is correct
- Check for missing type definitions
- Verify all imports are properly resolved

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Verbose TypeScript output
npm run build -- --verbose
```

## 📄 License

This project is licensed under the MIT License - 

## 🙏 Acknowledgments

- **HazelJS** - The microservices framework that makes this possible
- **OpenTelemetry** - Distributed tracing standards
- **Jest** - Testing framework
- **TypeScript** - Type-safe JavaScript

---

**Built with ❤️ for the microservices community**
