import { Controller, Post, Body, Get, Delete, Put, Logger } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { GetAllOrdersUseCase } from '../../application/use-cases/get-all-orders.use-case';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/update-order-status.use-case';
import { DeleteOrderUseCase } from '../../application/use-cases/delete-order.use-case';
import { CreateOrderDto } from '../dto/create-order.dto';
import { DeleteOrderDto } from '../dto/delete-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);

  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    this.logger.log(`Creating order for customer: ${createOrderDto.cliente}`);
    const result = await this.createOrderUseCase.execute({
      customer: createOrderDto.cliente,
      product: createOrderDto.producto,
    });
    this.logger.log(`Order created with ID: ${result.id}`);
    return { message: 'Pedido creado correctamente', id: result.id };
  }

  @Get()
  async findAll() {
    this.logger.log('Getting all orders');
    const orders = await this.getAllOrdersUseCase.execute();
    this.logger.log(`Found ${orders.length} orders`);

    const mappedOrders = orders.map((order) => ({
      id: order.id,
      cliente: order.customer,
      producto: order.product,
      estado: order.status,
      fechaCreacion: order.createdAt,
    }));

    this.logger.log('Mapped orders:', mappedOrders);
    return mappedOrders;
  }

  @Post('seed')
  async seedData() {
    this.logger.log('Creating seed data');

    const testOrders = [
      { cliente: 'Juan Pérez', producto: 'Pizza Margherita' },
      { cliente: 'María García', producto: 'Hamburguesa Clásica' },
      { cliente: 'Carlos López', producto: 'Ensalada César' },
    ];

    const createdOrders = [];
    for (const orderData of testOrders) {
      const result = await this.createOrderUseCase.execute({
        customer: orderData.cliente,
        product: orderData.producto,
      });
      createdOrders.push(result);
    }

    return {
      message: 'Datos de prueba creados exitosamente',
      orders: createdOrders
    };
  }

  @Delete()
  async delete(@Body() deleteOrderDto: DeleteOrderDto) {
    this.logger.log(`Deleting order with ID: ${deleteOrderDto.id}`);
    await this.deleteOrderUseCase.execute({
      id: deleteOrderDto.id,
    });
    return { message: 'Pedido eliminado correctamente' };
  }

  @Put()
  async update(@Body() updateOrderDto: UpdateOrderDto) {
    this.logger.log(`Updating order ${updateOrderDto.id} to status: ${updateOrderDto.estado}`);
    await this.updateOrderStatusUseCase.execute({
      id: updateOrderDto.id,
      status: updateOrderDto.estado,
    });
    return { message: 'Pedido actualizado correctamente' };
  }
}
