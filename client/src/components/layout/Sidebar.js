import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  X, 
  Home, 
  Package, 
  User, 
  Heart, 
  ShoppingCart,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { closeSidebar } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeSidebar());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch(closeSidebar())} />
      
      <div className="relative flex flex-col w-full max-w-xs bg-white h-full shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={() => dispatch(closeSidebar())}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/"
            className="sidebar-link"
            onClick={() => dispatch(closeSidebar())}
          >
            <Home className="h-5 w-5 inline mr-3" />
            Home
          </Link>

          <Link
            to="/products"
            className="sidebar-link"
            onClick={() => dispatch(closeSidebar())}
          >
            <Package className="h-5 w-5 inline mr-3" />
            All Products
          </Link>

          {/* Category Links */}
          <div className="pt-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Categories
            </h3>
            <Link
              to="/products?category=Electronics"
              className="sidebar-link"
              onClick={() => dispatch(closeSidebar())}
            >
              Electronics
            </Link>
            <Link
              to="/products?category=Clothing"
              className="sidebar-link"
              onClick={() => dispatch(closeSidebar())}
            >
              Clothing
            </Link>
            <Link
              to="/products?category=Books"
              className="sidebar-link"
              onClick={() => dispatch(closeSidebar())}
            >
              Books
            </Link>
            <Link
              to="/products?category=Home & Garden"
              className="sidebar-link"
              onClick={() => dispatch(closeSidebar())}
            >
              Home & Garden
            </Link>
            <Link
              to="/products?category=Sports"
              className="sidebar-link"
              onClick={() => dispatch(closeSidebar())}
            >
              Sports
            </Link>
            <Link
              to="/products?category=Beauty"
              className="sidebar-link"
              onClick={() => dispatch(closeSidebar())}
            >
              Beauty
            </Link>
          </div>

          {isAuthenticated && (
            <>
              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Account
                </h3>
                <Link
                  to="/profile"
                  className="sidebar-link"
                  onClick={() => dispatch(closeSidebar())}
                >
                  <User className="h-5 w-5 inline mr-3" />
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="sidebar-link"
                  onClick={() => dispatch(closeSidebar())}
                >
                  <Package className="h-5 w-5 inline mr-3" />
                  Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="sidebar-link"
                  onClick={() => dispatch(closeSidebar())}
                >
                  <Heart className="h-5 w-5 inline mr-3" />
                  Wishlist
                </Link>
                <Link
                  to="/cart"
                  className="sidebar-link"
                  onClick={() => dispatch(closeSidebar())}
                >
                  <ShoppingCart className="h-5 w-5 inline mr-3" />
                  Cart
                </Link>
              </div>

              {user?.role === 'admin' && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Admin
                  </h3>
                  <Link
                    to="/admin"
                    className="sidebar-link"
                    onClick={() => dispatch(closeSidebar())}
                  >
                    <Shield className="h-5 w-5 inline mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/products"
                    className="sidebar-link"
                    onClick={() => dispatch(closeSidebar())}
                  >
                    <Package className="h-5 w-5 inline mr-3" />
                    Products
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="sidebar-link"
                    onClick={() => dispatch(closeSidebar())}
                  >
                    <Package className="h-5 w-5 inline mr-3" />
                    Orders
                  </Link>
                  <Link
                    to="/admin/users"
                    className="sidebar-link"
                    onClick={() => dispatch(closeSidebar())}
                  >
                    <User className="h-5 w-5 inline mr-3" />
                    Users
                  </Link>
                </div>
              )}

              <div className="pt-4 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <div className="pt-4 border-t">
              <Link
                to="/login"
                className="sidebar-link"
                onClick={() => dispatch(closeSidebar())}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="sidebar-link"
                onClick={() => dispatch(closeSidebar())}
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
