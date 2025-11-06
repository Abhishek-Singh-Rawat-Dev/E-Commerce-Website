import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { fetchProductById, addProductReview } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import ProductCard from '../components/ui/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AIRecommendations from '../components/ai/AIRecommendations';
import { convertAndFormat } from '../utils/currency';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  const { currentProduct, relatedProducts, loading } = useSelector(state => state.products);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const userCurrency = user?.currency || 'USD';

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart({ product: currentProduct, quantity }));
      toast.success('Product added to cart!');
    }
  };

  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      dispatch(addToWishlist(id));
      toast.success('Product added to wishlist!');
    } else {
      toast.error('Please login to add to wishlist');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(addProductReview({
        productId: id,
        rating: reviewData.rating,
        comment: reviewData.comment
      }));
      setShowReviewForm(false);
      setReviewData({ rating: 5, comment: '' });
      toast.success('Review submitted successfully!');
    } else {
      toast.error('Please login to submit a review');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return <LoadingSpinner size="xl" className="min-h-screen" />;
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center hover:text-amazon-orange"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          <span>/</span>
          <span>{currentProduct.category}</span>
          <span>/</span>
          <span className="text-gray-900">{currentProduct.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={currentProduct.images[selectedImage]?.url || '/placeholder-product.jpg'}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {currentProduct.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {currentProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-amazon-orange' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${currentProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentProduct.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(currentProduct.ratings)}
                </div>
                <span className="text-sm text-gray-500">
                  ({currentProduct.numOfReviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-amazon-orange">
                  {convertAndFormat(currentProduct.price, userCurrency)}
                </span>
                {currentProduct.originalPrice && currentProduct.originalPrice > currentProduct.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {convertAndFormat(currentProduct.originalPrice, userCurrency)}
                    </span>
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                      {Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Features */}
            {currentProduct.features && currentProduct.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {currentProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-amazon-orange rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {currentProduct.stock} in stock
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={currentProduct.stock === 0}
                  className="flex-1 btn-primary py-3 flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <Truck className="h-5 w-5 mr-2 text-amazon-orange" />
                Free shipping on orders over $100
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Shield className="h-5 w-5 mr-2 text-amazon-orange" />
                30-day return policy
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <RotateCcw className="h-5 w-5 mr-2 text-amazon-orange" />
                Easy returns and exchanges
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Reviews ({currentProduct.numOfReviews})
            </h2>
            {isAuthenticated && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn-outline"
              >
                Write a Review
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= reviewData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    rows={4}
                    className="input-field"
                    placeholder="Share your thoughts about this product..."
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary">
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {currentProduct.reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-amazon-orange rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        <div className="mt-16">
          <AIRecommendations 
            productId={currentProduct._id} 
            category={currentProduct.category}
            title="AI Recommendations For You"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
