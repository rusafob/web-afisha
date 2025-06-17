import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  @ApiOperation({ summary: 'Проверка работоспособности API' })
  @ApiResponse({ status: 200, description: 'Сервис работает' })
  healthCheck(): string {
    return this.appService.getHealthStatus();
  }

  @Get('version')
  @ApiOperation({ summary: 'Версия API' })
  @ApiResponse({ status: 200, description: 'Возвращает версию' })
  getVersion(): { version: string } {
    return this.appService.getVersion();
  }
}