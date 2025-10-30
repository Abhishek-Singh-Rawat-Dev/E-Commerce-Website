import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }
    
    // After loading is complete, check authentication
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, isAuthenticated, authLoading, navigate]);

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 156789.50,
      revenueGrowth: 23.5,
      totalOrders: 1247,
      ordersGrowth: 12.3,
      totalCustomers: 856,
      customersGrowth: 8.7,
      averageOrderValue: 125.67,
      avgOrderGrowth: 5.2
    },
    salesByCategory: [
      { category: 'Electronics', sales: 45678.90, percentage: 29, growth: 15.3 },
      { category: 'Clothing', sales: 38234.50, percentage: 24, growth: -3.2 },
      { category: 'Books', sales: 28456.30, percentage: 18, growth: 8.7 },
      { category: 'Home & Garden', sales: 22890.40, percentage: 15, growth: 12.1 },
      { category: 'Sports', sales: 15234.20, percentage: 10, growth: 6.5 },
      { category: 'Beauty', sales: 6295.20, percentage: 4, growth: 18.9 }
    ],
    topProducts: [
      {
        name: 'Wireless Bluetooth Headphones',
        revenue: 12450.55,
        unitsSold: 125,
        category: 'Electronics'
      },
      {
        name: 'Smart Fitness Watch',
        revenue: 9998.68,
        unitsSold: 50,
        category: 'Electronics'
      },
      {
        name: 'Organic Cotton T-Shirt',
        revenue: 2499.72,
        unitsSold: 100,
        category: 'Clothing'
      },
      {
        name: 'Yoga Mat Premium',
        revenue: 2099.40,
        unitsSold: 60,
        category: 'Sports'
      },
      {
        name: 'Skincare Set',
        revenue: 3999.50,
        unitsSold: 50,
        category: 'Beauty'
      }
    ],
    revenueByMonth: [
      { month: 'Jan', revenue: 12500 },
      { month: 'Feb', revenue: 15800 },
      { month: 'Mar', revenue: 18200 },
      { month: 'Apr', revenue: 16900 },
      { month: 'May', revenue: 21300 },
      { month: 'Jun', revenue: 24500 },
      { month: 'Jul', revenue: 22800 },
      { month: 'Aug', revenue: 26700 },
      { month: 'Sep', revenue: 28900 },
      { month: 'Oct', revenue: 31200 },
      { month: 'Nov', revenue: 29500 },
      { month: 'Dec', revenue: 33400 }
    ],
    customerMetrics: {
      newCustomers: 124,
      returningCustomers: 732,
      customerRetentionRate: 85.5,
      averageLifetimeValue: 432.50
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const StatCard = ({ title, value, icon: Icon, growth, trend, prefix = '' }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-amazon-orange bg-opacity-10 rounded-lg">
          <Icon className="h-6 w-6 text-amazon-orange" />
        </div>
        {growth !== undefined && (
          <div className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            {Math.abs(growth)}%
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">
        {prefix}{value}
      </p>
      {growth !== undefined && (
        <p className="text-xs text-gray-500 mt-2">vs previous period</p>
      )}
    </div>
  );

  if (authLoading || loading) {
    return <LoadingSpinner size="xl" className="min-h-screen" />;
  }

  const maxRevenue = Math.max(...analyticsData.revenueByMonth.map(m => m.revenue));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">Track your business performance and insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(analyticsData.overview.totalRevenue)}
            icon={DollarSign}
            growth={analyticsData.overview.revenueGrowth}
            trend="up"
          />
          <StatCard
            title="Total Orders"
            value={analyticsData.overview.totalOrders.toLocaleString()}
            icon={ShoppingCart}
            growth={analyticsData.overview.ordersGrowth}
            trend="up"
          />
          <StatCard
            title="Total Customers"
            value={analyticsData.overview.totalCustomers.toLocaleString()}
            icon={Users}
            growth={analyticsData.overview.customersGrowth}
            trend="up"
          />
          <StatCard
            title="Avg Order Value"
            value={formatCurrency(analyticsData.overview.averageOrderValue)}
            icon={Package}
            growth={analyticsData.overview.avgOrderGrowth}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Monthly
              </div>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="space-y-3">
              {analyticsData.revenueByMonth.map((data) => (
                <div key={data.month} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{data.month}</div>
                  <div className="flex-1 ml-4">
                    <div className="relative h-8 bg-gray-100 rounded-md overflow-hidden">
                      <div
                        className="absolute h-full bg-gradient-to-r from-amazon-orange to-orange-600 rounded-md transition-all duration-500"
                        style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-24 text-right text-sm font-medium text-gray-900 ml-4">
                    {formatCurrency(data.revenue)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Metrics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Metrics</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">New Customers</span>
                  <span className="text-lg font-bold text-gray-900">
                    {analyticsData.customerMetrics.newCustomers}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: '35%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Returning Customers</span>
                  <span className="text-lg font-bold text-gray-900">
                    {analyticsData.customerMetrics.returningCustomers}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: '85%' }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Retention Rate</span>
                  <span className="text-lg font-bold text-green-600">
                    {analyticsData.customerMetrics.customerRetentionRate}%
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Avg Lifetime Value</span>
                  <span className="text-lg font-bold text-amazon-orange">
                    {formatCurrency(analyticsData.customerMetrics.averageLifetimeValue)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales by Category */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h2>
            <div className="space-y-4">
              {analyticsData.salesByCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{category.category}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-900">
                        {formatCurrency(category.sales)}
                      </span>
                      <span className={`text-xs font-medium ${category.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {category.growth >= 0 ? '+' : ''}{category.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amazon-orange h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h2>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amazon-orange bg-opacity-10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-amazon-orange">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {formatCurrency(product.revenue)}
                    </p>
                    <p className="text-xs text-gray-500">{product.unitsSold} units</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

