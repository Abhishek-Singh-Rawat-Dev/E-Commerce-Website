import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Eye,
  Download,
  Star,
  MapPin,
  CreditCard,
  Calendar,
  X
} from 'lucide-react';
import { fetchUserOrders } from '../store/slices/orderSlice';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const { user } = useSelector(state => state.auth);
  const { orders, loading } = useSelector(state => state.orders || { orders: [], loading: false });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchUserOrders());
  }, [user, navigate, dispatch]);

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
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <X className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderOrderCard = (order) => (
    <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-500">Order #{order._id}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="capitalize">{order.status}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Ordered on</p>
          <p className="text-sm font-medium">{formatDate(order.createdAt)}</p>
        </div>
      </div>

      <div className="space-y-4">
        {order.orderItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-lg font-semibold text-amazon-orange">
              ${order.totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedOrder(order);
                setShowOrderDetails(true);
              }}
              className="btn-outline flex items-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </button>
            {order.status === 'delivered' && (
              <button className="btn-outline flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrderDetails = () => (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowOrderDetails(false)} />
      
      <div className="relative flex flex-col w-full max-w-2xl bg-white h-full shadow-xl ml-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
          <button
            onClick={() => setShowOrderDetails(false)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Order Status</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="capitalize">{selectedOrder.status}</span>
                  </div>
                </div>
                {selectedOrder.trackingNumber && (
                  <p className="text-sm text-gray-600">
                    Tracking Number: <span className="font-medium">{selectedOrder.trackingNumber}</span>
                  </p>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrder.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-500">Price: ${item.price}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">{selectedOrder.shippingAddress.name}</p>
                  <p className="text-gray-600">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-gray-600">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600">{selectedOrder.shippingAddress.country}</p>
                  <p className="text-gray-600">{selectedOrder.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium capitalize">{selectedOrder.paymentMethod.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-medium ${selectedOrder.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedOrder.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                  {selectedOrder.isPaid && selectedOrder.paidAt && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Paid on:</span>
                      <span className="font-medium">{formatDate(selectedOrder.paidAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${selectedOrder.itemsPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">
                      {selectedOrder.shippingPrice === 0 ? 'Free' : `$${selectedOrder.shippingPrice.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">${selectedOrder.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-300 pt-2">
                    <span>Total:</span>
                    <span className="text-amazon-orange">${selectedOrder.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner size="xl" className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
            <button
              onClick={() => navigate('/products')}
              className="btn-primary"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(renderOrderCard)}
          </div>
        )}

        {/* Order Details Modal */}
        {showOrderDetails && renderOrderDetails()}
      </div>
    </div>
  );
};

export default OrdersPage;
