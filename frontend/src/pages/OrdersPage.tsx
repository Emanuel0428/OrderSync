import { useState, useEffect } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder, type Order } from '../services/orderService';

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [newOrder, setNewOrder] = useState<Order>({ cliente: '', producto: '', estado: 'PENDIENTE' });
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            setMessage('Error al cargar las órdenes');
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newOrder.cliente.trim() || !newOrder.producto.trim()) {
            setMessage('Por favor, complete todos los campos');
            return;
        }

        try {
            setLoading(true);
            const response = await createOrder(newOrder);
            setMessage(response.message);
            setNewOrder({ cliente: '', producto: '', estado: 'PENDIENTE' });
            await fetchOrders();
        } catch (error) {
            setMessage('Error al crear la orden');
            console.error('Error creating order:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDeleteOrder = async (id: string) => {
        try {
            setLoading(true);
            const response = await deleteOrder(id);
            setMessage(response.message);
            await fetchOrders();
        } catch (error) {
            setMessage('Error al eliminar la orden');
            console.error('Error deleting order:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrepareOrder = async (id: string) => {
        try {
            setLoading(true);
            const response = await updateOrder(id, { estado: 'PREPARANDO' });
            setMessage(response.message);
            await fetchOrders();
        } catch (error) {
            setMessage('Error al actualizar la orden');
            console.error('Error updating order:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeliverOrder = async (id: string) => {
        try {
            setLoading(true);
            const response = await updateOrder(id, { estado: 'ENTREGADO' });
            setMessage(response.message);
            await fetchOrders();
        } catch (error) {
            setMessage('Error al actualizar la orden');
            console.error('Error updating order:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Sistema de Gestión de Pedidos
                </h1>
                
                {/* Mostrar mensajes */}
                {message && (
                    <div className={`p-4 rounded-lg mb-6 ${
                        message.includes('Error') 
                            ? 'bg-red-50 text-red-800 border border-red-200' 
                            : 'bg-green-50 text-green-800 border border-green-200'
                    }`}>
                        {message}
                    </div>
                )}

                {/* Formulario para crear orden */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Crear Nuevo Pedido</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre del Cliente
                            </label>
                            <input 
                                id="cliente"
                                type="text" 
                                placeholder="Ingrese el nombre del cliente"
                                value={newOrder.cliente} 
                                onChange={e => setNewOrder({ ...newOrder, cliente: e.target.value })} 
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label htmlFor="producto" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre del Producto
                            </label>
                            <input 
                                id="producto"
                                type="text" 
                                placeholder="Ingrese el nombre del producto"
                                value={newOrder.producto} 
                                onChange={e => setNewOrder({ ...newOrder, producto: e.target.value })} 
                                disabled={loading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {loading ? 'Creando...' : 'Crear Pedido'}
                        </button>
                    </form>
                </div>

                {/* Lista de órdenes */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Lista de Pedidos</h2>
                    
                    {loading && (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-gray-600">Cargando...</span>
                        </div>
                    )}
                    
                    {orders.length === 0 && !loading ? (
                        <div className="text-center py-8 text-gray-500">
                            No hay pedidos disponibles
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {orders.map(order => (
                                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700 w-20">Cliente:</span>
                                                <span className="text-gray-900">{order.cliente}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700 w-20">Producto:</span>
                                                <span className="text-gray-900">{order.producto}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700 w-16">Estado:</span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    order.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.estado === 'PREPARANDO' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {order.estado}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium text-gray-700 w-16">Fecha:</span>
                                                <span className="text-gray-600 text-sm">
                                                    {order.fechaCreacion ? new Date(order.fechaCreacion).toLocaleString() : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                                        <button 
                                            onClick={() => handlePrepareOrder(order.id!)} 
                                            disabled={loading || order.estado !== 'PENDIENTE'}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                order.estado === 'PENDIENTE' 
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            Preparar
                                        </button>
                                        <button 
                                            onClick={() => handleDeliverOrder(order.id!)} 
                                            disabled={loading || order.estado !== 'PREPARANDO'}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                order.estado === 'PREPARANDO' 
                                                    ? 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500' 
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            Entregar
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteOrder(order.id!)} 
                                            disabled={loading}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;