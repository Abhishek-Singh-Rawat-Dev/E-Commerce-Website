import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist } from '../../store/slices/wishlistSlice';
import { convertAndFormat } from '../../utils/currency';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const userCurrency = user?.currency || 'USD';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success('Product added to cart!');
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      dispatch(addToWishlist(product._id));
      toast.success('Product added to wishlist!');
    } else {
      toast.error('Please login to add to wishlist');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card group">
      <div className="relative">
        <img
          src={product.images[0]?.url || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </button>

        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-amazon-orange transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {renderStars(product.ratings)}
          </div>
          <span className="text-sm text-gray-500">
            ({product.numOfReviews})
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-amazon-orange">
            {convertAndFormat(product.price, userCurrency)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {convertAndFormat(product.originalPrice, userCurrency)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2 bg-amazon-orange text-white rounded-md hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
