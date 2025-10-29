# OrderSync

Sistema de gestión de pedidos implementado con arquitectura de microservicios, arquitectura hexagonal y Domain-Driven Design (DDD).

## Descripción

OrderSync es un proyecto educativo diseñado para demostrar la implementación práctica de arquitecturas modernas de software. El sistema permite gestionar pedidos de manera eficiente a través de una arquitectura distribuida que incluye múltiples servicios especializados.

### Propósito del Proyecto

Este sistema sirve como laboratorio de aprendizaje para:
- Arquitectura Hexagonal (Ports & Adapters) y patrones de diseño
- Microservicios con diferentes tecnologías
- Domain-Driven Design con bounded contexts
- Integración de múltiples tecnologías en un ecosistema cohesivo
- Mejores prácticas de desarrollo de software moderno

## Arquitectura del Sistema

El proyecto está compuesto por 3 microservicios independientes:

### 1. Backend API (NestJS + TypeScript + PostgreSQL)
- **Puerto**: 3000
- **Tecnologías**: NestJS, TypeScript, PostgreSQL, TypeORM
- **Características**:
  - Arquitectura Hexagonal con DDD
  - API REST para gestión de pedidos
  - Entidades de dominio con eventos
  - Persistencia con PostgreSQL
  - Casos de uso bien definidos

### 2. Frontend Web (React + TypeScript + Vite)
- **Puerto**: 5173 (desarrollo)
- **Tecnologías**: React 19, TypeScript, Vite, TailwindCSS
- **Características**:
  - Single Page Application (SPA)
  - Interfaz moderna y responsiva
  - Consumo de APIs REST
  - Gestión de estado con React hooks

### 3. Log Service (Express.js + Node.js + MongoDB)
- **Puerto**: 5001
- **Tecnologías**: Express.js, Node.js, MongoDB, Mongoose
- **Características**:
  - Servicio independiente para logging
  - Almacenamiento en MongoDB
  - API REST para gestión de logs

## Funcionalidades

### Gestión de Pedidos
- Crear nuevos pedidos
- Visualizar lista de pedidos
- Actualizar estado de pedidos (PENDIENTE, PREPARANDO, ENTREGADO)
- Eliminar pedidos

### Estados de Pedidos
- **PENDIENTE**: Pedido recién creado
- **PREPARANDO**: Pedido en proceso de preparación
- **ENTREGADO**: Pedido completado y entregado

## Estructura del Proyecto

```
OrderSync/
├── backend/                    # API Backend (NestJS)
│   ├── src/
│   │   ├── orders/
│   │   │   ├── application/    # Casos de uso y puertos
│   │   │   ├── domain/         # Entidades y objetos de valor
│   │   │   └── infrastructure/ # Adaptadores y persistencia
│   │   └── main.ts
│   └── package.json
├── frontend/                   # Aplicación Web (React)
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
├── log-service/               # Servicio de Logs (Express)
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   └── package.json
└── README.md
```

## Tecnologías Utilizadas

### Backend
- **NestJS**: Framework de Node.js para construir aplicaciones escalables
- **TypeScript**: Superset de JavaScript con tipado estático
- **PostgreSQL**: Base de datos relacional
- **TypeORM**: ORM para TypeScript y JavaScript
- **Class Validator**: Validación de datos
- **UUID**: Generación de identificadores únicos

### Frontend
- **React 19**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Tipado estático para JavaScript
- **Vite**: Herramienta de construcción rápida
- **TailwindCSS**: Framework de CSS utilitario
- **Axios**: Cliente HTTP para realizar peticiones
- **React Router DOM**: Enrutamiento para aplicaciones React

### Log Service
- **Express.js**: Framework web minimalista para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **CORS**: Middleware para habilitar Cross-Origin Resource Sharing

## Requisitos del Sistema

- **Node.js**: v18 o superior
- **npm**: v8 o superior
- **PostgreSQL**: v12 o superior
- **MongoDB**: v4.4 o superior

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/Emanuel0428/OrderSync.git
cd OrderSync
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta backend:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=ordersync
```

### 3. Configurar Frontend
```bash
cd ../frontend
npm install
```

### 4. Configurar Log Service
```bash
cd ../log-service
npm install
```

Crear archivo `.env` en la carpeta log-service:
```env
PORT=5001
MONGO_URL=mongodb://localhost:27017/ordersync_logs
```

## Ejecución del Proyecto

### Opción 1: Ejecutar cada servicio por separado

#### Backend
```bash
cd backend
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm run dev
```

#### Log Service
```bash
cd log-service
npm run dev
```

### Opción 2: Ejecutar todos los servicios (desde la raíz)
```bash
# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Frontend
cd frontend && npm run dev

# Terminal 3 - Log Service
cd log-service && npm run dev
```

## URLs de Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Log Service**: http://localhost:5001

## API Endpoints

### Pedidos (Backend - Puerto 3000)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/orders` | Obtener todos los pedidos |
| POST   | `/orders` | Crear un nuevo pedido |
| PATCH  | `/orders/:id/status` | Actualizar estado del pedido |
| DELETE | `/orders/:id` | Eliminar un pedido |

### Logs (Log Service - Puerto 5001)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/logs` | Obtener todos los logs |
| POST   | `/logs` | Crear un nuevo log |

## Ejemplos de Uso

### Crear un Pedido
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": "Juan Pérez",
    "producto": "Pizza Margherita"
  }'
```

### Obtener Pedidos
```bash
curl http://localhost:3000/orders
```

### Actualizar Estado del Pedido
```bash
curl -X PATCH http://localhost:3000/orders/123e4567-e89b-12d3-a456-426614174000/status \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "PREPARANDO"
  }'
```

## Scripts Disponibles

### Backend
- `npm run start`: Iniciar en modo producción
- `npm run start:dev`: Iniciar en modo desarrollo con watch
- `npm run build`: Construir el proyecto
- `npm run test`: Ejecutar tests unitarios
- `npm run test:e2e`: Ejecutar tests end-to-end

### Frontend
- `npm run dev`: Iniciar servidor de desarrollo
- `npm run build`: Construir para producción
- `npm run preview`: Vista previa de la construcción
- `npm run lint`: Ejecutar linter

### Log Service
- `npm start`: Iniciar en modo producción
- `npm run dev`: Iniciar con nodemon para desarrollo

## Arquitectura Hexagonal

El backend implementa arquitectura hexagonal con las siguientes capas:

### Dominio (Core)
- **Entidades**: `Order` - Representa el agregado principal
- **Objetos de Valor**: `OrderId`, `Customer`, `Product`, `OrderStatus`
- **Eventos de Dominio**: `OrderCreatedEvent`, `OrderStatusChangedEvent`

### Aplicación
- **Casos de Uso**: `CreateOrderUseCase`, `GetAllOrdersUseCase`, etc.
- **Puertos**: Interfaces que definen contratos (`OrderRepositoryPort`)

### Infraestructura
- **Adaptadores**: Implementaciones concretas de los puertos
- **Controladores**: Puntos de entrada HTTP
- **Repositorios**: Persistencia con TypeORM

## Contribución

1. Fork el proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Autor

**Emanuel Londoño** - Desarrollador Principal

## Notas de Desarrollo

Este proyecto ha sido desarrollado con fines educativos para demostrar:
- Implementación práctica de arquitectura hexagonal
- Aplicación de principios de Domain-Driven Design
- Desarrollo de microservicios con diferentes tecnologías
- Integración de frontend y backend moderno
- Mejores prácticas de desarrollo de software

Para más detalles sobre la arquitectura, consulta el archivo `backend/ARCHITECTURE.md`.