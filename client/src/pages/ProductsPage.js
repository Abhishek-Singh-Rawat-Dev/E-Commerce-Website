import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal,
  X,
  ChevronDown
} from 'lucide-react';
import { fetchProducts, fetchCategories, setFilters, clearFilters } from '../store/slices/productSlice';
import ProductCard from '../components/ui/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, categories, brands, loading, filters, pagination } = useSelector(state => state.products);
  
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Fetch categories and brands on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First', order: 'desc' },
    { value: 'createdAt', label: 'Oldest First', order: 'asc' },
    { value: 'price', label: 'Price: Low to High', order: 'asc' },
    { value: 'price', label: 'Price: High to Low', order: 'desc' },
    { value: 'ratings', label: 'Highest Rated', order: 'desc' },
    { value: 'name', label: 'Name: A to Z', order: 'asc' },
    { value: 'name', label: 'Name: Z to A', order: 'desc' },
  ];

  const handleSort = (option) => {
    dispatch(setFilters({ 
      sortBy: option.value, 
      sortOrder: option.order 
    }));
    setShowSortMenu(false);
  };

  const getCurrentSortLabel = () => {
    const current = sortOptions.find(
      option => option.value === filters.sortBy && option.order === filters.sortOrder
    );
    return current ? current.label : 'Sort by';
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== '' && value !== 'createdAt' && value !== 'desc'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            {pagination.totalProducts} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-amazon-orange hover:text-orange-600"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search products..."
                    className="input-field"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      placeholder="Min"
                      className="input-field"
                    />
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      placeholder="Max"
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="1">1+ Stars</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="bg-amazon-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
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

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowSortMenu(!showSortMenu)}
                      className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      {getCurrentSortLabel()}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {showSortMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        {sortOptions.map((option) => (
                          <button
                            key={`${option.value}-${option.order}`}
                            onClick={() => handleSort(option)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <LoadingSpinner size="lg" className="py-12" />
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center mt-8 space-x-2">
                    <button
                      onClick={() => dispatch(setFilters({ page: pagination.currentPage - 1 }))}
                      disabled={!pagination.hasPrev}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => dispatch(setFilters({ page }))}
                        className={`px-3 py-2 text-sm border rounded-md ${
                          page === pagination.currentPage
                            ? 'bg-amazon-orange text-white border-amazon-orange'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => dispatch(setFilters({ page: pagination.currentPage + 1 }))}
                      disabled={!pagination.hasNext}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
