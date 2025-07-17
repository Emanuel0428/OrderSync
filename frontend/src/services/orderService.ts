import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/orders';

export interface Order {
    id?: string;
    cliente: string;
    producto: string;
    estado: 'PENDIENTE' | 'PREPARANDO' | 'ENTREGADO';
    fechaCreacion?: Date;
}

// Interfaces para las respuestas del backend
interface CreateOrderResponse {
    message: string;
    id: string;
}

interface UpdateOrderResponse {
    message: string;
}

interface DeleteOrderResponse {
    message: string;
}

export const getOrders = async (): Promise<Order[]> => {
    const response = await axios.get<Order[]>(API_BASE_URL);
    return response.data;
};

export const createOrder = async (order: Order): Promise<CreateOrderResponse> => {
    const response = await axios.post<CreateOrderResponse>(API_BASE_URL, order);
    return response.data;
};

export const updateOrder = async (id: string, order: Partial<Order>): Promise<UpdateOrderResponse> => {
    const response = await axios.put<UpdateOrderResponse>(API_BASE_URL, { 
        id, 
        cliente: order.cliente,
        producto: order.producto,
        estado: order.estado 
    });
    return response.data;
};

export const deleteOrder = async (id: string): Promise<DeleteOrderResponse> => {
    const response = await axios.delete<DeleteOrderResponse>(API_BASE_URL, { 
        data: { id } 
    });
    return response.data;
};  

