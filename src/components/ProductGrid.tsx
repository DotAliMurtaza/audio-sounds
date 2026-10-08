import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  activeCategory: ProductCategory | 'All';
  onSelectCategory: (category: ProductCategory | 'All') => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  wishlistIds: Set<string>;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onViewDetails,
  wishlistIds,
  searchQuery = '',
  onClearSearch,
}) => {
  const [selectedSubfilter, setSelectedSubfilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: (ProductCategory | 'All')[] = ['All', 'Earbuds', 'Handsfree', 'Headphones'];

  // Subfilter options based on category
  const subfilterOptions = useMemo(() => {
    if (activeCategory === 'Earbuds') {
      return [
        { id: 'all', label: 'All Earbuds' },
        { id: 'Wireless Earbuds', label: 'Wireless' },
        { id: 'TWS Earbuds', label: 'TWS Hybrid' },
        { id: 'Premium Earbuds', label: 'Beryllium Reference' },
        { id: 'Noise-Cancelling Earbuds', label: 'ANC Isolation' },
        { id: 'Gaming Earbuds', label: 'Gaming 28ms' },
      ];
    }
    if (activeCategory === 'Handsfree') {
      return [
        { id: 'all', label: 'All Handsfree' },
        { id: 'Wired Handsfree', label: 'Kevlar Wired' },
        { id: 'Bluetooth Handsfree', label: 'Bluetooth Neckband' },
        { id: 'Premium Handsfree', label: 'Titanium Dual-Driver' },
      ];
    }
    if (activeCategory === 'Headphones') {
      return [
        { id: 'all', label: 'All Headphones' },
        { id: 'Premium Over-Ear Headphones', label: 'Flagship Reference' },
        { id: 'Noise-Cancelling Headphones', label: 'Studio ANC' },
        { id: 'Gaming Headphones', label: 'Spatial 7.1 Gaming' },
        { id: 'Wireless Headphones', label: 'Wireless Over-Ear' },
        { id: 'Bluetooth Headphones', label: 'Compact Bluetooth' },
      ];
    }
    return [
      { id: 'all', label: 'All Disciplines' },
      { id: 'anc', label: 'Active Noise Cancelling' },
      { id: 'hires', label: 'Hi-Res Audio Certified' },
      { id: 'bestseller', label: 'Best Sellers' },
      { id: 'new', label: 'New Arrivals' },
    ];
  }, [activeCategory]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Subfilter
    if (selectedSubfilter !== 'all') {
      if (selectedSubfilter === 'anc') {
        list = list.filter((p) => Boolean(p.specs.anc));
      } else if (selectedSubfilter === 'hires') {
        list = list.filter((p) => p.soundProfile === 'Warm Audiophile' || p.price > 120);
      } else if (selectedSubfilter === 'bestseller') {
        list = list.filter((p) => Boolean(p.isBestSeller));
      } else if (selectedSubfilter === 'new') {
        list = list.filter((p) => Boolean(p.isNewArrival));
      } else {
        list = list.filter((p) => p.subcategory === selectedSubfilter);
      }
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // Featured
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [products, activeCategory, selectedSubfilter, sortBy, searchQuery]);

  return (
    <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Catalog Title & Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            The Complete Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {activeCategory === 'All' ? 'Audio Engineering Catalog' : `${activeCategory} Collection`}
          </h2>
          {searchQuery && (
            <div className="mt-2 text-sm text-zinc-400 flex items-center gap-2">
              <span>Showing results for &ldquo;{searchQuery}&rdquo;</span>
              <button
                onClick={onClearSearch}
                className="text-amber-400 hover:underline text-xs"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Primary Category Segmented Control (Allowed functional tab buttons) */}
        <div className="flex items-center p-1 bg-zinc-900 border border-white/10 rounded-xl overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                setSelectedSubfilter('all');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subfilter Bar & Sorting Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/5">
        
        {/* Subfilter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-zinc-400 shrink-0 hidden sm:block mr-1" />
          {subfilterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedSubfilter(opt.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                selectedSubfilter === opt.id
                  ? 'bg-white/10 border-amber-500/50 text-amber-300'
                  : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 text-xs">
          <span className="text-zinc-400 font-mono tabular-nums">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'model' : 'models'}
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onToggleWishlist={onToggleWishlist}
              onViewDetails={onViewDetails}
              isWishlisted={wishlistIds.has(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-zinc-900/40 rounded-2xl border border-white/5">
          <p className="text-zinc-400 text-base">No models found matching your selected criteria.</p>
          <button
            onClick={() => {
              onSelectCategory('All');
              setSelectedSubfilter('all');
            }}
            className="mt-4 px-4 py-2 bg-amber-400 text-black text-xs font-semibold rounded-lg hover:bg-amber-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};
