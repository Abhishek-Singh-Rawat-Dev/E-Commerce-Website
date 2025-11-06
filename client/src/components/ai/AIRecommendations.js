import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { api } from '../../config/api';
import ProductCard from '../ui/ProductCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const AIRecommendations = ({ productId, category, title = "AI Recommendations For You" }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (productId) params.append('productId', productId);
        if (category) params.append('category', category);

        const response = await api.get(`/api/products/recommendations?${params.toString()}`);
        
        if (response.data.success) {
          setRecommendations(response.data.products || []);
        }
      } catch (error) {
        console.error('Failed to fetch AI recommendations:', error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [productId, category]);

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-8">
          <Sparkles className="h-6 w-6 text-amazon-orange" />
          <h2 className="text-3xl font-bold text-gray-900">
            {title}
          </h2>
        </div>
        <p className="text-gray-600 mb-8">
          Powered by AI to find products you'll love
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;

