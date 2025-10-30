import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X,
  Camera,
  Lock,
  Package,
  Heart,
  CreditCard
} from 'lucide-react';
import { updateProfile } from '../store/slices/authSlice';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const { user, loading } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Pre-fill form with user data
    setValue('name', user.name || '');
    setValue('email', user.email || '');
    setValue('phone', user.phone || '');
    setValue('street', user.address?.street || '');
    setValue('city', user.address?.city || '');
    setValue('state', user.address?.state || '');
    setValue('zipCode', user.address?.zipCode || '');
    setValue('country', user.address?.country || '');
  }, [user, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      const profileData = {
        name: data.name,
        phone: data.phone,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country
        }
      };

      await dispatch(updateProfile(profileData)).unwrap();
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'orders', name: 'Orders', icon: <Package className="h-5 w-5" /> },
    { id: 'wishlist', name: 'Wishlist', icon: <Heart className="h-5 w-5" /> },
    { id: 'payment', name: 'Payment Methods', icon: <CreditCard className="h-5 w-5" /> }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-amazon-orange rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-outline flex items-center"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                disabled={!isEditing}
                className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  value={user?.email}
                  disabled
                  className="input-field pl-10 bg-gray-50"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                {...register('phone')}
                disabled={!isEditing}
                className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Address Information
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  {...register('street')}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    {...register('city')}
                    disabled={!isEditing}
                    className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    {...register('state')}
                    disabled={!isEditing}
                    className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                    placeholder="Enter state"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    {...register('zipCode')}
                    disabled={!isEditing}
                    className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                    placeholder="Enter ZIP code"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  {...register('country')}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                  placeholder="Enter country"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center"
              >
                {loading ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-outline flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          Security
        </h3>
        <div className="space-y-4">
          <button className="btn-outline w-full md:w-auto">
            Change Password
          </button>
          <button className="btn-outline w-full md:w-auto ml-0 md:ml-4">
            Two-Factor Authentication
          </button>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Order History</h3>
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h4>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );

  const renderWishlistTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Wishlist</h3>
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h4>
          <p className="text-gray-600 mb-6">Save items you love for later</p>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Browse Products
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h3>
        <div className="text-center py-12">
          <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No payment methods saved</h4>
          <p className="text-gray-600 mb-6">Add a payment method for faster checkout</p>
          <button className="btn-primary">
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner size="xl" className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-amazon-orange text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-3">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'orders' && renderOrdersTab()}
            {activeTab === 'wishlist' && renderWishlistTab()}
            {activeTab === 'payment' && renderPaymentTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
