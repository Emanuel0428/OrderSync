export interface LoggerPort {
  info(message: string, module: string): Promise<void>;
  warn(message: string, module: string): Promise<void>;
  error(message: string, module: string): Promise<void>;
}
