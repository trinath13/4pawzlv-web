import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Scissors, Stethoscope, GraduationCap, Home as HomeIcon, PawPrint, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Service } from '@/types';
import PageHeader from '@/components/PageHeader';

const categoryIcons: Record<string, typeof Scissors> = {
  Grooming: Scissors,
  Veterinary: Stethoscope,
  Training: GraduationCap,
  Boarding: HomeIcon,
};

const categories = ['All', 'Grooming', 'Veterinary', 'Training', 'Boarding'];

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('services').select('*').order('category, created_at');
      setServices(data ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesCat = activeCat === 'All' || s.category === activeCat;
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [services, activeCat, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Service[]>();
    filtered.forEach((s) => {
      const arr = map.get(s.category) ?? [];
      arr.push(s);
      map.set(s.category, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Expert grooming, veterinary care, training, and boarding — each delivered by certified professionals who genuinely love animals."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        bgImage="https://images.pexels.com/photos/19145894/pexels-photo-19145894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-16 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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
          ) : grouped.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <PawPrint className="w-10 h-10 text-primary-400" />
              </div>
              <p className="font-display text-xl font-semibold text-primary-900">No services found</p>
              <p className="text-gray-500 mt-2">Try a different search or category filter.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {grouped.map(([category, items]) => {
                const Icon = categoryIcons[category] ?? PawPrint;
                return (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-primary-900">{category}</h2>
                      <span className="text-sm text-gray-400">({items.length})</span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((service) => (
                        <div
                          key={service.id}
                          className="group bg-white rounded-2xl overflow-hidden border border-primary-100 hover:shadow-xl hover:shadow-primary-900/10 transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="relative overflow-hidden h-52">
                            <img
                              src={service.image_url}
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur rounded-lg text-sm font-bold text-primary-700">
                              ${service.price}
                            </div>
                          </div>
                          <div className="p-5">
                            <h3 className="font-display text-lg font-semibold text-primary-900 mb-2">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-50">
                              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                {service.duration_mins >= 60
                                  ? `${Math.floor(service.duration_mins / 60)}h ${service.duration_mins % 60 ? `${service.duration_mins % 60}m` : ''}`
                                  : `${service.duration_mins}m`}
                              </span>
                              <Link
                                to="/book"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:gap-2 transition-all"
                              >
                                Book now
                                <ChevronRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
