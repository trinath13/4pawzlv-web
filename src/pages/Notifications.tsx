import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Tag, Package, Calendar, FileText, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Notification } from '@/types';
import PageHeader from '@/components/PageHeader';

const typeConfig: Record<string, { icon: typeof Info; color: string; bg: string; label: string }> = {
  promotion: { icon: Tag, color: 'text-accent-600', bg: 'bg-accent-100', label: 'Promotion' },
  product: { icon: Package, color: 'text-primary-700', bg: 'bg-primary-100', label: 'Product' },
  event: { icon: Calendar, color: 'text-secondary-700', bg: 'bg-secondary-100', label: 'Event' },
  blog: { icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50', label: 'Blog' },
  update: { icon: Info, color: 'text-secondary-600', bg: 'bg-secondary-50', label: 'Update' },
  alert: { icon: AlertCircle, color: 'text-error-600', bg: 'bg-error-50', label: 'Alert' },
  info: { icon: Bell, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Notice' },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('All');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
      setNotifications(data ?? []);
      setLoading(false);
    })();
  }, []);

  const types = ['All', ...Array.from(new Set(notifications.map((n) => n.type)))];
  const filtered = activeType === 'All' ? notifications : notifications.filter((n) => n.type === activeType);

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Stay up to date with promotions, new arrivals, events, and important announcements from 4pawzlv."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Notifications' }]}
        bgImage="https://images.pexels.com/photos/6131149/pexels-photo-6131149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-16 bg-cream-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all capitalize ${
                  activeType === type
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-white text-gray-600 border border-primary-100 hover:bg-primary-50'
                }`}
              >
                {type === 'All' ? 'All' : typeConfig[type]?.label ?? type}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-primary-100">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-primary-400" />
              </div>
              <p className="font-display text-xl font-semibold text-primary-900">No notifications</p>
              <p className="text-gray-500 mt-2">Check back later for updates and announcements.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((notification) => {
                const config = typeConfig[notification.type] ?? typeConfig.info;
                return (
                  <div
                    key={notification.id}
                    className="group bg-white rounded-2xl p-5 sm:p-6 border border-primary-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {notification.image_url ? (
                        <img
                          src={notification.image_url}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                      ) : (
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${config.bg}`}>
                          <config.icon className={`w-7 h-7 ${config.color}`} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${config.bg} ${config.color}`}>
                            {config.label}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(notification.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-primary-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Never miss an update
            </h2>
            <p className="text-primary-100 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter and get notifications delivered straight to your inbox — plus exclusive subscriber-only offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/95 border-0 focus:outline-none focus:ring-2 focus:ring-accent-400 text-gray-800"
              />
              <button className="px-6 py-3 rounded-xl bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
