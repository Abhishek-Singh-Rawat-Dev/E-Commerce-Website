import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ShoppingBag, 
  Truck, 
  Shield, 
  Headphones,
  Star,
  ArrowRight
} from 'lucide-react';
import { fetchFeaturedProducts, fetchCategories } from '../store/slices/productSlice';
import ProductCard from '../components/ui/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredProducts, categories, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-amazon-orange" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $100"
    },
    {
      icon: <Shield className="h-8 w-8 text-amazon-orange" />,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: <Headphones className="h-8 w-8 text-amazon-orange" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support"
    },
    {
      icon: <Star className="h-8 w-8 text-amazon-orange" />,
      title: "Quality Products",
      description: "Only the best products for you"
    }
  ];

  const categoryCards = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      link: '/products?category=Electronics'
    },
    {
      name: 'Clothing',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      link: '/products?category=Clothing'
    },
    {
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      link: '/products?category=Books'
    },
    {
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      link: '/products?category=Home & Garden'
    },
    {
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      link: '/products?category=Sports'
    },
    {
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      link: '/products?category=Beauty'
    }
  ];

  if (loading) {
    return <LoadingSpinner size="xl" className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amazon-dark to-amazon-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Welcome to
                <span className="text-gradient block">Amazon Clone</span>
              </h1>
              <p className="text-xl text-gray-300">
                Discover amazing products at unbeatable prices. 
                Shop with confidence and enjoy fast, reliable delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/products?category=Electronics"
                  className="btn-outline text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-amazon-dark"
                >
                  Browse Electronics
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600"
                alt="Shopping"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryCards.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked products just for you
              </p>
            </div>
            <Link
              to="/products"
              className="btn-outline inline-flex items-center"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner size="lg" className="py-12" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-amazon-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for the latest deals and updates
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
            />
            <button className="px-6 py-3 bg-amazon-orange hover:bg-orange-600 rounded-r-md font-medium transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
