import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthStatus(): string {
    return 'Event Management API is running';
  }

  getVersion(): { version: string } {
    return { version: '1.0.0' };
  }

  getSystemInfo() {
    return {
      status: 'OK',
      timestamp: new Date(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}