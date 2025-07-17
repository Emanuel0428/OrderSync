import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { LoggerPort } from '../../application/ports/logger.port';

@Injectable()
export class AxiosLoggerAdapter implements LoggerPort {
  private readonly logUrl: string;
  private readonly logger = new Logger(AxiosLoggerAdapter.name);

  constructor(private configService: ConfigService) {
    this.logUrl = this.configService.get<string>('LOG_URL');
  }

  async info(message: string, module: string): Promise<void> {
    await this.log(message, module, 'INFO');
  }

  async warn(message: string, module: string): Promise<void> {
    await this.log(message, module, 'WARN');
  }

  async error(message: string, module: string): Promise<void> {
    await this.log(message, module, 'ERROR');
  }

  private async log(
    message: string,
    module: string,
    level: 'INFO' | 'WARN' | 'ERROR',
  ): Promise<void> {
    try {
      await axios.post(this.logUrl, {
        mensaje: message,
        modulo: module,
        nivel: level,
      });
    } catch (error) {
      this.logger.warn(`No se pudo registrar log: ${error.message}`);
    }
  }
}
