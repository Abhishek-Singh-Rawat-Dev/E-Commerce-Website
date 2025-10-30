import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ShoppingCart, 
  Eye, 
  Truck,
  CheckCircle,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { api } from '../../config/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const { user, loading: authLoading } = useSelector(state => state.auth);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || user.role !== 'admin') return;
      
      try {
        setLoading(true);
        const response = await api.get('/api/orders/admin/all', {
          params: { limit: 1000 }
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user && user.role === 'admin') {
      fetchOrders();
    }
  }, [user, authLoading]);

  const statuses = ['All', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order._id.includes(searchTerm);
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <ShoppingCart className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return <LoadingSpinner size="xl" className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                {statuses.map(status => (
                  <option key={status} value={status === 'All' ? '' : status}>
                    {status === 'All' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-amazon-orange rounded-full flex items-center justify-center text-white font-semibold">
                    {order.user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{order.user.name}</h3>
                    <p className="text-sm text-gray-500">{order.user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(order.totalPrice)}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Order #{order._id}</span>
                    <span>{formatDate(order.createdAt)}</span>
                    <span className="capitalize">{order.paymentMethod.replace('_', ' ')}</span>
                    <span className={order.isPaid ? 'text-green-600' : 'text-red-600'}>
                      {order.isPaid ? 'Paid' : 'Pending Payment'}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    className="btn-outline flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter 
                ? 'Try adjusting your search or filter criteria'
                : 'No orders have been placed yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
