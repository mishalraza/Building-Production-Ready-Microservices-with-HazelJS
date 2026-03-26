import { Controller, Get } from '@hazeljs/core';

interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  version: string;
}

@Controller('health')
export class HealthController {
  @Get('health')
  getHealth(): HealthResponse {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    };
  }

  @Get('ready')
  getReadiness(): HealthResponse {
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    };
  }

  @Get('live')
  getLiveness(): HealthResponse {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    };
  }
}