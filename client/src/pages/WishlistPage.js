import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star,
  Eye,
  Share2,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import { fetchWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import ProductCard from '../components/ui/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('dateAdded');

  const { user } = useSelector(state => state.auth);
  const { items: wishlist, loading } = useSelector(state => state.wishlist);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchWishlist());
  }, [user, navigate, dispatch]);

  const mockWishlist = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      originalPrice: 149.99,
      images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' }],
      ratings: 4.5,
      numOfReviews: 128,
      stock: 50,
      category: 'Electronics',
      brand: 'TechSound',
      dateAdded: '2024-01-15T10:00:00Z'
    },
    {
      _id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 249.99,
      images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' }],
      ratings: 4.8,
      numOfReviews: 89,
      stock: 30,
      category: 'Electronics',
      brand: 'FitTech',
      dateAdded: '2024-01-14T15:30:00Z'
    },
    {
      _id: '3',
      name: 'Organic Cotton T-Shirt',
      price: 24.99,
      originalPrice: 34.99,
      images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' }],
      ratings: 4.2,
      numOfReviews: 45,
      stock: 100,
      category: 'Clothing',
      brand: 'EcoWear',
      dateAdded: '2024-01-13T09:15:00Z'
    },
    {
      _id: '4',
      name: 'Programming Fundamentals Book',
      price: 39.99,
      originalPrice: 49.99,
      images: [{ url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400' }],
      ratings: 4.7,
      numOfReviews: 67,
      stock: 75,
      category: 'Books',
      brand: 'TechBooks',
      dateAdded: '2024-01-12T14:20:00Z'
    }
  ];

  const displayWishlist = wishlist.length > 0 ? wishlist : mockWishlist;

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success('Product added to cart!');
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Product removed from wishlist');
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    handleRemoveFromWishlist(product._id);
    toast.success('Product moved to cart!');
  };

  const handleShareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist',
        text: 'Check out my wishlist on Amazon Clone',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Wishlist link copied to clipboard!');
    }
  };

  const sortedWishlist = [...displayWishlist].sort((a, b) => {
    switch (sortBy) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'rating':
        return b.ratings - a.ratings;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'dateAdded':
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  const getTotalSavings = () => {
    return displayWishlist.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return total + (item.originalPrice - item.price);
      }
      return total;
    }, 0);
  };

  if (displayWishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-lg text-gray-600 mb-8">
              Save items you love for later. When you find something you like, click the heart icon to add it to your wishlist.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="btn-primary text-lg px-8 py-3"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-2">
                {displayWishlist.length} {displayWishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShareWishlist}
                className="btn-outline flex items-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{displayWishlist.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${displayWishlist.reduce((total, item) => total + item.price, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Potential Savings</p>
                <p className="text-2xl font-bold text-green-600">
                  ${getTotalSavings().toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                >
                  <option value="dateAdded">Date Added</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${
                  viewMode === 'grid' 
                    ? 'bg-amazon-orange text-white' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list' 
                    ? 'bg-amazon-orange text-white' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedWishlist.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
              {viewMode === 'grid' ? (
                <div className="relative">
                  <img
                    src={product.images[0]?.url || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  
                  {/* Remove from wishlist button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>

                  {/* Discount badge */}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4 p-4">
                  <img
                    src={product.images[0]?.url || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.ratings}</span>
                      <span className="text-sm text-gray-500">({product.numOfReviews})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-amazon-orange">${product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="btn-outline text-sm px-4 py-2"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {viewMode === 'grid' && (
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.ratings}</span>
                    <span className="text-sm text-gray-500">({product.numOfReviews})</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-amazon-orange">${product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1 btn-primary text-sm py-2"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="btn-outline text-sm px-3 py-2"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        {displayWishlist.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  displayWishlist.forEach(product => handleAddToCart(product));
                  toast.success('All items added to cart!');
                }}
                className="btn-primary"
              >
                Add All to Cart
              </button>
              <button
                onClick={() => {
                  displayWishlist.forEach(product => handleRemoveFromWishlist(product._id));
                  toast.success('Wishlist cleared!');
                }}
                className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
