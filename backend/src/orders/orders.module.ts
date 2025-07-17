import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Infrastructure
import { OrdersController } from './infrastructure/controllers/orders.controller';
import { TypeOrmOrderEntity } from './infrastructure/persistence/typeorm-order.entity';
import { TypeOrmOrderRepository } from './infrastructure/persistence/typeorm-order.repository';
import { AxiosLoggerAdapter } from './infrastructure/logging/axios-logger.adapter';

// Application
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { GetAllOrdersUseCase } from './application/use-cases/get-all-orders.use-case';
import { UpdateOrderStatusUseCase } from './application/use-cases/update-order-status.use-case';
import { DeleteOrderUseCase } from './application/use-cases/delete-order.use-case';

// Ports
import { ORDER_REPOSITORY_PORT, LOGGER_PORT } from './application/ports/tokens';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmOrderEntity]), ConfigModule],
  controllers: [OrdersController],
  providers: [
    // Use Cases
    CreateOrderUseCase,
    GetAllOrdersUseCase,
    UpdateOrderStatusUseCase,
    DeleteOrderUseCase,

    // Adapters (Infrastructure implementations of ports)
    {
      provide: ORDER_REPOSITORY_PORT,
      useClass: TypeOrmOrderRepository,
    },
    {
      provide: LOGGER_PORT,
      useClass: AxiosLoggerAdapter,
    },
  ],
})
export class OrdersModule {}
