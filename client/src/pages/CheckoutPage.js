import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  User,
  Lock,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { clearCart, saveShippingAddress } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/orderSlice';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  const { items, totalPrice, shippingAddress } = useSelector(state => state.cart);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    // Pre-fill form with existing shipping address
    if (shippingAddress) {
      Object.keys(shippingAddress).forEach(key => {
        setValue(key, shippingAddress[key]);
      });
    }
  }, [isAuthenticated, items.length, navigate, shippingAddress, setValue]);

  const steps = [
    { id: 1, name: 'Shipping', icon: <Truck className="h-5 w-5" /> },
    { id: 2, name: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
    { id: 3, name: 'Review', icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const shippingCost = totalPrice > 100 ? 0 : 10;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + shippingCost + tax;

  const onShippingSubmit = (data) => {
    dispatch(saveShippingAddress(data));
    setCurrentStep(2);
  };

  const onPaymentSubmit = () => {
    setCurrentStep(3);
  };

  const onFinalSubmit = async () => {
    setIsProcessing(true);
    try {
      // Create order
      const orderData = {
        orderItems: items.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: totalPrice,
        taxPrice: tax,
        shippingPrice: shippingCost,
        totalPrice: finalTotal
      };

      // Dispatch order creation
      await dispatch(createOrder(orderData)).unwrap();
      
      // Clear cart
      dispatch(clearCart());
      
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderShippingStep = () => (
    <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            className="input-field"
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            {...register('lastName', { required: 'Last name is required' })}
            className="input-field"
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <input
          {...register('street', { required: 'Street address is required' })}
          className="input-field"
          placeholder="Enter street address"
        />
        {errors.street && (
          <p className="text-red-600 text-sm mt-1">{errors.street.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            {...register('city', { required: 'City is required' })}
            className="input-field"
            placeholder="Enter city"
          />
          {errors.city && (
            <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            {...register('state', { required: 'State is required' })}
            className="input-field"
            placeholder="Enter state"
          />
          {errors.state && (
            <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            {...register('zipCode', { required: 'ZIP code is required' })}
            className="input-field"
            placeholder="Enter ZIP code"
          />
          {errors.zipCode && (
            <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          {...register('phone', { required: 'Phone number is required' })}
          className="input-field"
          placeholder="Enter phone number"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <button type="submit" className="w-full btn-primary py-3">
        Continue to Payment
      </button>
    </form>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="space-y-3">
          {[
            { id: 'credit_card', name: 'Credit Card', icon: <CreditCard className="h-5 w-5" /> },
            { id: 'debit_card', name: 'Debit Card', icon: <CreditCard className="h-5 w-5" /> },
            { id: 'paypal', name: 'PayPal', icon: <Lock className="h-5 w-5" /> },
            { id: 'cash_on_delivery', name: 'Cash on Delivery', icon: <Truck className="h-5 w-5" /> }
          ].map((method) => (
            <label key={method.id} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                paymentMethod === method.id ? 'border-amazon-orange bg-amazon-orange' : 'border-gray-300'
              }`}>
                {paymentMethod === method.id && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
              {method.icon}
              <span className="ml-2 text-gray-900">{method.name}</span>
            </label>
          ))}
        </div>
      </div>

      {paymentMethod === 'credit_card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              className="input-field"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                className="input-field"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                className="input-field"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      )}

      <button onClick={onPaymentSubmit} className="w-full btn-primary py-3">
        Continue to Review
      </button>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex items-center space-x-4">
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

          <div className="border-t border-gray-200 mt-6 pt-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
              <span>Total</span>
              <span className="text-amazon-orange">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-amazon-orange mt-1" />
            <div>
              <p className="font-medium text-gray-900">
                {shippingAddress?.firstName} {shippingAddress?.lastName}
              </p>
              <p className="text-gray-600">{shippingAddress?.street}</p>
              <p className="text-gray-600">
                {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}
              </p>
              <p className="text-gray-600">{shippingAddress?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-amazon-orange" />
            <span className="text-gray-900 capitalize">
              {paymentMethod.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onFinalSubmit}
        disabled={isProcessing}
        className="w-full btn-primary py-3 flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Processing Order...
          </>
        ) : (
          'Place Order'
        )}
      </button>
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to proceed to checkout</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-amazon-orange hover:text-orange-600 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'border-amazon-orange bg-amazon-orange text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-amazon-orange' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-amazon-orange' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {currentStep === 1 && renderShippingStep()}
              {currentStep === 2 && renderPaymentStep()}
              {currentStep === 3 && renderReviewStep()}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span className="text-amazon-orange">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {totalPrice < 100 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
