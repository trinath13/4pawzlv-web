import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Search, BookOpen, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types';
import PageHeader from '@/components/PageHeader';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    })();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCat = activeCat === 'All' || p.category === activeCat;
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [posts, activeCat, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <PageHeader
        title="Pet Care Blog"
        subtitle="Tips, stories, and expert advice on keeping your companion healthy, happy, and well-cared for."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
        bgImage="https://images.pexels.com/photos/8538273/pexels-photo-8538273.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-16 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search + Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
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
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-primary-400" />
              </div>
              <p className="font-display text-xl font-semibold text-primary-900">No articles found</p>
              <p className="text-gray-500 mt-2">Try a different search or category.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && activeCat === 'All' && !query && (
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group block mb-10 bg-white rounded-3xl overflow-hidden border border-primary-100 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={featured.image_url}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary-600 text-white text-xs font-bold rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                        <span className="font-semibold text-primary-600">{featured.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featured.read_mins} min read
                        </span>
                      </div>
                      <h2 className="font-display text-2xl lg:text-3xl font-bold text-primary-900 leading-tight mb-3 group-hover:text-primary-700 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-4">{featured.excerpt}</p>
                      <div className="flex items-center gap-2 text-primary-700 font-semibold text-sm">
                        <span>{featured.author}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Post grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCat === 'All' && !query ? rest : filtered).map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-primary-100 hover:shadow-xl hover:shadow-primary-900/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-primary-700 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <Clock className="w-3.5 h-3.5" />
                        {post.read_mins} min read
                      </div>
                      <h3 className="font-display text-lg font-semibold text-primary-900 leading-snug mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <p className="mt-4 text-xs font-medium text-primary-600">By {post.author}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
