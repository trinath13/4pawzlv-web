import { useEffect, useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';

const categories = ['All', 'Food', 'Treats', 'Accessories', 'Comfort'];

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('products').select('*').order('created_at');
      setProducts(data ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCat = activeCat === 'All' || p.category === activeCat;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, activeCat, query, sort]);

  return (
    <>
      <PageHeader
        title="Shop Products"
        subtitle="Premium pet food, treats, accessories, and comfort items — all carefully selected for quality and safety."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Shop' }]}
        bgImage="https://images.pexels.com/photos/4445456/pexels-photo-4445456.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-16 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCat === cat
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                      : 'bg-white text-gray-600 border border-primary-100 hover:bg-primary-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl bg-white border border-primary-100 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400 appearance-none cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {loading ? 'Loading...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                  <div className="w-full h-40 bg-gray-200 rounded-xl mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-primary-400" />
              </div>
              <p className="font-display text-xl font-semibold text-primary-900">No products found</p>
              <p className="text-gray-500 mt-2">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
