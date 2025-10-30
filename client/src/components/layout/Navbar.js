import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Heart,
  LogOut,
  Package
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { toggleSidebar, toggleCart } from '../../store/slices/uiSlice';
import { setFilters } from '../../store/slices/productSlice';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setFilters({ search: searchQuery.trim() }));
      navigate('/products');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="bg-amazon-dark text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-amazon-orange">Amazon</div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-amazon-orange hover:bg-orange-600 rounded-r-md transition-colors duration-200"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="md:hidden p-2 hover:bg-gray-700 rounded-md"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* User Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-1 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block">{user?.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-3 py-2 text-sm hover:bg-gray-700 rounded-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 text-sm bg-amazon-orange hover:bg-orange-600 rounded-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 hover:bg-gray-700 rounded-md"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amazon-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
