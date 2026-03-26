import { Module } from '@hazeljs/core';
import { ConfigService } from './config.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  providers: [ConfigService, AuthMiddleware],
  exports: [ConfigService, AuthMiddleware],
})
export class GatewayModule {}