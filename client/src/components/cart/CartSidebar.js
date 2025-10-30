import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { closeCart, updateQuantity, removeFromCart } from '../../store/slices/cartSlice';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch(closeCart())} />
      
      <div className="relative flex flex-col w-full max-w-md bg-white h-full shadow-xl ml-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Shopping Cart ({totalItems})
          </h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag className="h-16 w-16 mb-4" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some items to get started</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <p className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold text-amazon-orange">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-2">
              <Link
                to="/cart"
                className="w-full btn-outline text-center block"
                onClick={() => dispatch(closeCart())}
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                className="w-full btn-primary text-center block"
                onClick={() => dispatch(closeCart())}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
