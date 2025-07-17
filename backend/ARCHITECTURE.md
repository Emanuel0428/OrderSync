# OrderSync - Arquitectura de Microservicios con Hexagonal Architecture y DDD

## Resumen

**OrderSync** es un proyecto educativo diseñado para demostrar la implementación práctica de **arquitecturas modernas de software**, incluyendo **Arquitectura Hexagonal** (Ports & Adapters), **Domain-Driven Design (DDD)** y **Microservicios**.

### 🎯 Propósito del Proyecto

Este sistema sirve como **laboratorio de aprendizaje** para:
- **Arquitectura Hexagonal** y patrones de diseño
- **Microservicios** con diferentes tecnologías
- **Domain-Driven Design** con bounded contexts
- **Integración de múltiples tecnologías** en un ecosistema cohesivo
- **Mejores prácticas** de desarrollo de software moderno

### 🏗️ Arquitectura del Sistema

El proyecto está compuesto por **3 microservicios independientes**:

1. **Backend API** (NestJS + TypeScript + PostgreSQL)
   - Arquitectura Hexagonal con DDD
   - API REST para gestión de pedidos
   - Persistencia en PostgreSQL

2. **Frontend Web** (React + TypeScript + Vite)
   - SPA con interfaz moderna
   - Consumo de APIs REST
   - Estilizado con TailwindCSS

3. **Log Service** (Express.js + Node.js + MongoDB)
   - Microservicio de logging centralizado
   - Framework Express.js sobre Node.js
   - Almacenamiento en MongoDB
   - API REST para consulta de logs

### ✨ Beneficios Arquitecturales

- **Separación clara de responsabilidades**
- **Independencia de frameworks**
- **Facilidad para testing y mantenimiento**
- **Escalabilidad horizontal**
- **Intercambiabilidad de componentes**

## Arquitectura de Microservicios

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Log Service   │
│   (React TS)    │    │   (NestJS TS)   │    │  (Express.js)   │
│                 │    │                 │    │                 │
│ • React 19      │    │ • Hexagonal     │    │ • Express.js    │
│ • TypeScript    │◄──►│   Architecture  │◄──►│ • Node.js       │
│ • TailwindCSS   │    │ • DDD Patterns  │    │ • MongoDB       │
│ • Vite          │    │ • PostgreSQL    │    │ • REST API      │
│ • Axios         │    │ • TypeORM       │    │ • Mongoose      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
       │                        │                        │
       └────── HTTP REST ───────┼───── HTTP Logging ────┘
                                 │
                         ┌─────────────┐
                         │ PostgreSQL  │
                         │ Database    │
                         └─────────────┘
```

## Stack Tecnológico

### 🎯 Backend API (NestJS)
- **Framework**: NestJS + TypeScript
- **Arquitectura**: Hexagonal + DDD
- **Base de Datos**: PostgreSQL + TypeORM
- **Logging**: Axios HTTP client
- **Validación**: class-validator + class-transformer
- **Testing**: Jest + Supertest

### 🖥️ Frontend (React)
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Estilos**: TailwindCSS + PostCSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Linting**: ESLint + TypeScript ESLint

### 📊 Log Service (Express.js)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MongoDB + Mongoose
- **Middleware**: CORS + express.json()
- **Environment**: dotenv

## Estructura del Backend (Arquitectura Hexagonal)

```
backend/
├── src/
│   ├── orders/                          # 📦 Bounded Context: Orders
│   │   ├── domain/                      # 🧠 Capa de Dominio (Core Business)
│   │   │   ├── entities/
│   │   │   │   └── order.entity.ts      # Entidad agregada Order
│   │   │   ├── value-objects/           # Value Objects inmutables
│   │   │   │   ├── order-id.vo.ts       # ID con validación UUID
│   │   │   │   ├── order-status.vo.ts   # Estado con reglas de negocio
│   │   │   │   ├── customer.vo.ts       # Cliente con validaciones
│   │   │   │   └── product.vo.ts        # Producto con validaciones
│   │   │   └── events/                  # Eventos de dominio
│   │   │       ├── domain-event.ts      # Interfaz base
│   │   │       ├── order-created.event.ts
│   │   │       └── order-status-changed.event.ts
│   │   ├── application/                 # 🔧 Capa de Aplicación (Use Cases)
│   │   │   ├── ports/                   # 🔌 Puertos (Interfaces)
│   │   │   │   ├── order-repository.port.ts  # Contrato de persistencia
│   │   │   │   ├── logger.port.ts             # Contrato de logging
│   │   │   │   └── tokens.ts                  # Tokens DI
│   │   │   └── use-cases/               # Casos de uso específicos
│   │   │       ├── create-order.use-case.ts
│   │   │       ├── get-all-orders.use-case.ts
│   │   │       ├── update-order-status.use-case.ts
│   │   │       └── delete-order.use-case.ts
│   │   ├── infrastructure/              # 🔩 Capa de Infraestructura (Adapters)
│   │   │   ├── controllers/             # Adaptadores de entrada
│   │   │   │   └── orders.controller.ts # REST API controller
│   │   │   ├── persistence/             # Adaptadores de persistencia
│   │   │   │   ├── typeorm-order.entity.ts    # Entidad ORM
│   │   │   │   └── typeorm-order.repository.ts # Implementación repo
│   │   │   ├── logging/                 # Adaptadores de logging
│   │   │   │   └── axios-logger.adapter.ts    # HTTP logging
│   │   │   └── dto/                     # DTOs para API
│   │   │       ├── create-order.dto.ts
│   │   │       ├── update-order.dto.ts
│   │   │       └── delete-order.dto.ts
│   │   └── orders.module.ts             # Módulo NestJS con DI
│   ├── shared/                          # 🌐 Servicios compartidos
│   │   └── shared.module.ts
│   ├── app.module.ts                    # Módulo raíz
│   └── main.ts                          # Bootstrap de la aplicación
├── test/                                # 🧪 Tests end-to-end
├── package.json                         # Dependencias y scripts
└── ARCHITECTURE.md                      # 📚 Documentación arquitectural
```

## Capas de la Arquitectura

### 1. Capa de Dominio (Domain Layer)

**Responsabilidad**: Contiene la lógica de negocio pura, libre de dependencias externas.

#### Entidades de Dominio
- **Order**: Agregado raíz que encapsula las reglas de negocio
- Contiene métodos como `create()`, `changeStatus()`, `canBeDelivered()`
- Maneja eventos de dominio

#### Value Objects
- **OrderId**: Identificador único con validación UUID
- **OrderStatus**: Estado con validaciones y métodos de consulta
- **Customer**: Nombre del cliente con validaciones
- **Product**: Nombre del producto con validaciones

#### Eventos de Dominio
- **OrderCreatedEvent**: Se dispara al crear una orden
- **OrderStatusChangedEvent**: Se dispara al cambiar el estado

### 2. Capa de Aplicación (Application Layer)

**Responsabilidad**: Orquesta las operaciones de dominio y coordina con la infraestructura.

#### Puertos (Interfaces)
- **OrderRepositoryPort**: Define operaciones de persistencia
- **LoggerPort**: Define operaciones de logging

#### Casos de Uso
- **CreateOrderUseCase**: Crear nueva orden
- **GetAllOrdersUseCase**: Obtener todas las órdenes
- **UpdateOrderStatusUseCase**: Actualizar estado de orden
- **DeleteOrderUseCase**: Eliminar orden

### 3. Capa de Infraestructura (Infrastructure Layer)

**Responsabilidad**: Implementa los detalles técnicos y adaptadores.

#### Adaptadores
- **TypeOrmOrderRepository**: Implementa persistencia con TypeORM
- **AxiosLoggerAdapter**: Implementa logging con Axios
- **OrdersController**: Expone API REST

## Beneficios de la Arquitectura

### 1. Independencia de Frameworks
- El dominio no depende de NestJS, TypeORM o cualquier framework
- Fácil migración a otras tecnologías

### 2. Testabilidad
- Cada capa puede ser probada independientemente
- Mocking sencillo de dependencias

### 3. Mantenibilidad
- Separación clara de responsabilidades
- Cambios en infraestructura no afectan el dominio

### 4. Escalabilidad
- Fácil agregar nuevos casos de uso
- Nuevos adaptadores sin modificar el core

## Patrones Implementados

### 1. Domain-Driven Design (DDD)
- **Bounded Context**: Orders
- **Aggregates**: Order
- **Value Objects**: OrderId, OrderStatus, Customer, Product
- **Domain Events**: OrderCreated, OrderStatusChanged

### 2. Hexagonal Architecture
- **Ports**: Interfaces que definen contratos
- **Adapters**: Implementaciones concretas
- **Dependency Inversion**: El dominio no depende de la infraestructura

### 3. CQRS (Command Query Responsibility Segregation)
- Separación entre comandos (escritura) y consultas (lectura)
- Casos de uso específicos para cada operación

## Inyección de Dependencias

Se utilizan tokens de inyección para mantener la inversión de dependencias:

```typescript
// Tokens
export const ORDER_REPOSITORY_PORT = Symbol('ORDER_REPOSITORY_PORT');
export const LOGGER_PORT = Symbol('LOGGER_PORT');

// Configuración en el módulo
{
  provide: ORDER_REPOSITORY_PORT,
  useClass: TypeOrmOrderRepository,
}
```

## Eventos de Dominio

Los eventos se manejan internamente en las entidades:

```typescript
// En la entidad Order
changeStatus(newStatus: OrderStatus): void {
  // ... lógica de cambio
  this.addDomainEvent(new OrderStatusChangedEvent(this, previousStatus, newStatus));
}

// En el caso de uso
const events = order.pullDomainEvents();
for (const event of events) {
  // Procesar evento
}
```

## Flujo de Datos

1. **Request** → Controller (Infrastructure)
2. **Controller** → Use Case (Application)
3. **Use Case** → Domain Entity (Domain)
4. **Use Case** → Repository Port (Application)
5. **Repository Implementation** → Database (Infrastructure)

## Comandos Útiles

```bash
# Compilar el proyecto
npm run build

# Ejecutar en desarrollo
npm run start:dev

# Ejecutar tests
npm run test

# Ejecutar tests e2e
npm run test:e2e
```

## Próximos Pasos y Evolución

### 🚀 Mejoras Técnicas
1. **Testing Completo**
   - Tests unitarios para cada capa
   - Tests de integración entre servicios
   - Tests end-to-end del flujo completo

2. **Observabilidad**
   - Métricas con Prometheus
   - Tracing distribuido
   - Dashboards con Grafana

3. **DevOps y Deployment**
   - Containerización con Docker
   - Orquestación con Kubernetes
   - CI/CD pipelines

### 📈 Extensiones Funcionales
1. **Event Sourcing**
   - Auditoría completa de cambios
   - Replay de eventos
   - Proyecciones de estado

2. **CQRS Avanzado**
   - Read models optimizados
   - Separación de bases de datos
   - Cache distribuido

3. **Nuevos Bounded Contexts**
   - Usuarios y autenticación
   - Inventario y productos
   - Facturación y pagos

### 🔧 Tecnologías a Explorar
- **Message Brokers**: RabbitMQ, Apache Kafka
- **Cache**: Redis, Memcached
- **API Gateway**: Kong, Nginx
- **Service Mesh**: Istio, Linkerd

## 🎓 Valor Educativo

Este proyecto demuestra:
- **Separación de responsabilidades** clara
- **Testabilidad** de cada componente
- **Mantenibilidad** a largo plazo
- **Escalabilidad** horizontal
- **Independencia tecnológica**
- **Principios SOLID** aplicados
- **Clean Architecture** en la práctica 