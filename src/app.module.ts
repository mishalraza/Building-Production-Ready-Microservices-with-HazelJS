import { Module } from '@hazeljs/core';
import { ServiceRegistry } from '@hazeljs/discovery';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  constructor() {
    new ServiceRegistry({
      name: 'user-service',
      port: 3001,
      healthCheckPath: '/health',
      metadata: {
        description: 'User management service',
        team: 'platform',
      },
    });
  }
}