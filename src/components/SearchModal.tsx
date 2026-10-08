import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Search, X, Star, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const quickSearches = ['Beryllium', 'Noise-Cancelling', 'Kevlar Wired', 'Titanium Over-Ear', 'Gaming 28ms'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#111217] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search earbuds, handsfree, headphones, ANC..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-white px-2 py-1 bg-zinc-800 rounded"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {!query && (
          <div className="p-6">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/5 text-xs text-zinc-300 hover:text-white hover:border-amber-500/40 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-white/5">
            {results.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 text-sm">
                No audio models matching &ldquo;{query}&rdquo;
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 px-2 flex items-center justify-between hover:bg-white/5 rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-zinc-900"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {product.name}
                      </div>
                      <div className="text-xs text-zinc-400 font-mono">
                        {product.subcategory} · ${product.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
