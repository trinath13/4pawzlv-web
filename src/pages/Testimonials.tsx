import { useEffect, useState } from 'react';
import { Quote, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/types';
import PageHeader from '@/components/PageHeader';
import StarRating from '@/components/StarRating';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('testimonials').select('*').order('created_at');
      setTestimonials(data ?? []);
      setLoading(false);
    })();
  }, []);

  const avgRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '0.0';

  return (
    <>
      <PageHeader
        title="Testimonials"
        subtitle="Real stories from the families who trust us with their best friends. Every review is from a verified visit."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Testimonials' }]}
        bgImage="https://images.pexels.com/photos/20680840/pexels-photo-20680840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Stats bar */}
      <section className="bg-white py-10 border-b border-primary-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-4xl font-bold text-primary-700">{avgRating}</p>
              <p className="text-sm text-gray-500 mt-1">Average Rating</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-primary-700">{testimonials.length}+</p>
              <p className="text-sm text-gray-500 mt-1">Verified Reviews</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-primary-700">98%</p>
              <p className="text-sm text-gray-500 mt-1">Would Recommend</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-primary-700">12k+</p>
              <p className="text-sm text-gray-500 mt-1">Happy Pets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-16 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl p-6 border border-primary-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="w-10 h-10 text-primary-200" />
                    <StarRating rating={t.rating} size="sm" />
                  </div>
                  <p className="text-gray-600 leading-relaxed flex-1">
                    "{t.content}"
                  </p>
                  {t.service_name && (
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 rounded-lg text-xs font-medium text-primary-600 w-fit">
                      <Heart className="w-3.5 h-3.5" />
                      {t.service_name}
                    </div>
                  )}
                  <div className="mt-5 pt-5 border-t border-primary-50 flex items-center gap-3">
                    <img
                      src={t.image_url}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100"
                    />
                    <div>
                      <p className="font-semibold text-primary-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">
                        with {t.pet_name} · {t.pet_type}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
