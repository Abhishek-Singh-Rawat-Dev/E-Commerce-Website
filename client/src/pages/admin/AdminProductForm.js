import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Upload, X, Sparkles } from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { api } from '../../config/api';
import toast from 'react-hot-toast';

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [generatingDescription, setGeneratingDescription] = useState(false);
  const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'Electronics',
      subcategory: '',
      brand: '',
      stock: '',
      features: '',
      isFeatured: false
    }
  });

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }
    
    // After loading is complete, check authentication
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, isAuthenticated, authLoading, navigate]);

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Toys'
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Parse features from comma-separated string to array
      const features = data.features
        ? data.features.split(',').map(f => f.trim()).filter(f => f)
        : [];

      const productData = {
        ...data,
        features,
        price: parseFloat(data.price),
        originalPrice: parseFloat(data.originalPrice),
        stock: parseInt(data.stock),
        images: imagePreview.map((url, index) => ({
          public_id: `product_${Date.now()}_${index}`,
          url
        }))
      };

      console.log('Product data to submit:', productData);
      
      // Call API to create or update product
      if (isEditMode) {
        await api.put(`/api/products/${id}`, productData);
        toast.success('Product updated successfully!');
      } else {
        await api.post('/api/products', productData);
        toast.success('Product created successfully!');
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const generateAIDescription = async () => {
    try {
      const name = watch('name');
      const category = watch('category') || 'General';
      const price = watch('price') || 0;
      const features = watch('features');

      if (!name || name.trim() === '') {
        toast.error('Please enter a product name first');
        return;
      }

      setGeneratingDescription(true);
      toast.loading('Generating description with AI... This may take 30-60 seconds as we research the product.', { id: 'generating' });
      
      // Create a custom axios instance with longer timeout for this request
      const descriptionApi = axios.create({
        baseURL: api.defaults.baseURL,
        timeout: 90000, // 90 seconds for AI description generation
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const response = await descriptionApi.post('/api/ai/generate-description', {
        name: name.trim(),
        category: category || 'General',
        price: parseFloat(price) || 0,
        features: features ? features.split(',').map(f => f.trim()).filter(f => f) : []
      });

      if (response.data.success) {
        // Ensure description doesn't exceed 5000 characters (database limit)
        let description = response.data.description || '';
        if (description.length > 5000) {
          description = description.substring(0, 4997) + '...';
          toast.error('Description was truncated to fit database limit');
        }
        setValue('description', description);
        toast.dismiss('generating');
        toast.success('AI description generated successfully!');
      } else {
        toast.dismiss('generating');
        toast.error('Failed to generate description');
      }
    } catch (error) {
      console.error('Error generating description:', error);
      toast.dismiss('generating');
      toast.error(error.response?.data?.message || 'Failed to generate description. Please try again.');
    } finally {
      setGeneratingDescription(false);
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner size="xl" className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/products')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditMode ? 'Update product information' : 'Add a new product to your store'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Product Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload images</span>
                <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</span>
              </label>
            </div>

            {/* Image Previews */}
            {imagePreview.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {imagePreview.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              {...register('name', { required: 'Product name is required' })}
              type="text"
              className="input-field"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <button
                type="button"
                onClick={generateAIDescription}
                disabled={generatingDescription || !watch('name') || watch('name')?.trim() === ''}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-amazon-orange text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span>{generatingDescription ? 'Generating...' : 'Generate with AI'}</span>
              </button>
            </div>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="input-field"
              placeholder="Enter product description or click 'Generate with AI' to create one automatically"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Enter a product name and click "Generate with AI" to create a professional description. The AI will research the product and generate a detailed description based on real product information.
            </p>
          </div>

          {/* Price and Original Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' }
                })}
                type="number"
                step="0.01"
                className="input-field"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price
              </label>
              <input
                {...register('originalPrice', {
                  min: { value: 0, message: 'Price must be positive' }
                })}
                type="number"
                step="0.01"
                className="input-field"
                placeholder="0.00"
              />
              {errors.originalPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.originalPrice.message}</p>
              )}
            </div>
          </div>

          {/* Category, Subcategory, Brand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="input-field"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <input
                {...register('subcategory')}
                type="text"
                className="input-field"
                placeholder="e.g., Audio, Wearables"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                {...register('brand', { required: 'Brand is required' })}
                type="text"
                className="input-field"
                placeholder="Enter brand name"
              />
              {errors.brand && (
                <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity *
            </label>
            <input
              {...register('stock', {
                required: 'Stock quantity is required',
                min: { value: 0, message: 'Stock must be 0 or greater' }
              })}
              type="number"
              className="input-field"
              placeholder="0"
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
            )}
          </div>

          {/* Features */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features (comma-separated)
            </label>
            <textarea
              {...register('features')}
              rows={3}
              className="input-field"
              placeholder="e.g., Wireless connectivity, 30-hour battery, Noise cancellation"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter product features separated by commas
            </p>
          </div>

          {/* Featured Product */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                {...register('isFeatured')}
                type="checkbox"
                className="rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Mark as Featured Product
              </span>
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Featured products will be displayed on the homepage
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;

