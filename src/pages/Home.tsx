import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, PawPrint, Scissors, Stethoscope, GraduationCap, Home as HomeIcon,
  Heart, Shield, Clock, Sparkles, Star, Quote, ChevronRight,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Service, Product, Testimonial, SubscriptionPlan } from '@/types';
import SectionTitle from '@/components/SectionTitle';
import StarRating from '@/components/StarRating';
import ProductCard from '@/components/ProductCard';

const categoryIcons: Record<string, typeof Scissors> = {
  Grooming: Scissors,
  Veterinary: Stethoscope,
  Training: GraduationCap,
  Boarding: HomeIcon,
};

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [svc, prod, test, sub] = await Promise.all([
        supabase.from('services').select('*').order('created_at').limit(6),
        supabase.from('products').select('*').order('created_at').limit(4),
        supabase.from('testimonials').select('*').order('created_at').limit(3),
        supabase.from('subscription_plans').select('*').order('price'),
      ]);
      setServices(svc.data ?? []);
      setProducts(prod.data ?? []);
      setTestimonials(test.data ?? []);
      setPlans(sub.data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 via-cream-50 to-primary-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-primary-200">
                <Sparkles className="w-4 h-4 text-accent-500" />
                <span className="text-sm font-semibold text-primary-700">Trusted by 10,000+ pet families</span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-900 leading-[1.05]">
                Where every paw feels{' '}
                <span className="text-primary-600 italic">at home</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Premium grooming, veterinary care, training, and boarding — plus a curated shop of pet products and subscription plans that deliver happiness to your door.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-[0.98] transition-all shadow-lg shadow-primary-500/25"
                >
                  Book an Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-primary-700 font-semibold border border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
                >
                  Shop Products
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={5} size="sm" />
                  <span className="text-sm font-semibold text-gray-700">4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 text-secondary-500" />
                  <span>Certified groomers & vets</span>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative animate-fade-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/20">
                <img
                  src="https://images.pexels.com/photos/29582994/pexels-photo-29582994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Happy dog running outdoors"
                  className="w-full h-[400px] lg:h-[520px] object-cover"
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-white rounded-2xl shadow-xl p-4 border border-primary-100 max-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-primary-900">12k+</p>
                    <p className="text-xs text-gray-500">Happy pets</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-2xl shadow-xl p-4 border border-primary-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                    <PawPrint className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-primary-900">25+</p>
                    <p className="text-xs text-gray-500">Services offered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="What We Do"
            title="Comprehensive care for every companion"
            subtitle="From spa days to checkups, training to boarding — our expert team covers every aspect of your pet's wellbeing."
            center
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: Scissors, title: 'Grooming', desc: 'Baths, haircuts, nail care & spa treatments', color: 'primary' },
              { icon: Stethoscope, title: 'Veterinary', desc: 'Checkups, vaccinations, dental & nutrition', color: 'secondary' },
              { icon: GraduationCap, title: 'Training', desc: 'Puppy classes & behavioral consultations', color: 'accent' },
              { icon: HomeIcon, title: 'Boarding', desc: 'Luxury suites & daycare with live cams', color: 'primary' },
            ].map((cat) => {
              const colorMap: Record<string, string> = {
                primary: 'bg-primary-100 text-primary-700 group-hover:bg-primary-600 group-hover:text-white',
                secondary: 'bg-secondary-100 text-secondary-700 group-hover:bg-secondary-600 group-hover:text-white',
                accent: 'bg-accent-100 text-accent-600 group-hover:bg-accent-500 group-hover:text-white',
              };
              return (
                <Link
                  key={cat.title}
                  to="/services"
                  className="group bg-cream-50 rounded-2xl p-6 border border-primary-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${colorMap[cat.color]}`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-primary-900 mb-1">{cat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cat.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-20 bg-cream-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <SectionTitle
              eyebrow="Popular Services"
              title="Book a session your pet will love"
              subtitle="Our most-requested services, delivered by certified professionals who treat your pet like family."
            />
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-primary-700 font-semibold hover:gap-3 transition-all shrink-0"
            >
              View all services
              <ArrowRight className="w-4 h-4" />
            </Link>
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
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = categoryIcons[service.category] ?? PawPrint;
                return (
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
                      <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-700" />
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-primary-500 uppercase tracking-wider">
                        {service.category}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-primary-900 mt-1 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/19145874/pexels-photo-19145874.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Pet grooming"
                  className="rounded-2xl object-cover w-full h-64 shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/6235650/pexels-photo-6235650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Veterinary care"
                  className="rounded-2xl object-cover w-full h-64 shadow-lg mt-8"
                />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-primary-900 text-white rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <div>
                  <p className="font-display text-2xl font-bold">4.9</p>
                  <p className="text-xs text-primary-200">2,400+ reviews</p>
                </div>
              </div>
            </div>

            <div>
              <SectionTitle
                eyebrow="Why 4pawzlv"
                title="Care that goes beyond the basics"
                subtitle="We have built a home where pets are understood, celebrated, and looked after with the same love you give them."
              />
              <div className="space-y-5">
                {[
                  { icon: Heart, title: 'Genuine Love for Animals', desc: 'Our team is made of pet parents who treat every visitor as if they were their own.' },
                  { icon: Shield, title: 'Certified & Insured', desc: 'All groomers, vets, and trainers hold current certifications and full insurance.' },
                  { icon: Clock, title: 'Flexible Scheduling', desc: 'Book online in seconds with same-day and weekend appointments available.' },
                  { icon: Sparkles, title: 'Premium Products', desc: 'We use only top-rated, cruelty-free products in every service and on our shelves.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-600 group-hover:text-white text-primary-700 flex items-center justify-center shrink-0 transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-cream-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <SectionTitle
              eyebrow="Shop Favorites"
              title="Treats, toys & essentials pets adore"
              subtitle="Hand-picked products that meet our quality bar — no fillers, no fluff."
            />
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-primary-700 font-semibold hover:gap-3 transition-all shrink-0"
            >
              Browse all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                  <div className="w-full h-40 bg-gray-200 rounded-xl mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SUBSCRIPTION PLANS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Subscription Plans"
            title="Set it and forget it care"
            subtitle="Recurring plans that keep your pet healthy, groomed, and happy — with savings and priority booking built in."
            center
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-primary-500 bg-primary-50 shadow-xl shadow-primary-500/10'
                    : 'border-primary-100 bg-cream-50 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                <img
                  src={plan.image_url}
                  alt={plan.name}
                  className="w-full h-32 rounded-xl object-cover mb-4"
                />
                <h3 className="font-display text-lg font-bold text-primary-900">{plan.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2 min-h-[2rem]">
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-primary-700">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-gray-500">/{plan.billing_cycle}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Heart className="w-4 h-4 text-secondary-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/subscriptions"
                  className={`block mt-5 py-2.5 rounded-xl text-center font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-white text-primary-700 border border-primary-200 hover:bg-primary-50'
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-primary-950 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-800/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-900/30 rounded-full blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Happy Tails"
              title="Loved by pets and their humans"
              subtitle="Real stories from the families who trust us with their best friends."
              center
              light
            />
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-primary-900/50 backdrop-blur rounded-2xl p-6 border border-primary-800"
                >
                  <Quote className="w-8 h-8 text-primary-600 mb-4" />
                  <p className="text-cream-100 leading-relaxed text-sm line-clamp-4">
                    "{t.content}"
                  </p>
                  <div className="mt-5 pt-5 border-t border-primary-800 flex items-center gap-3">
                    <img
                      src={t.image_url}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-700"
                    />
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-xs text-primary-300">
                        with {t.pet_name} · {t.pet_type}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={t.rating} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-900 font-semibold hover:bg-cream-100 transition-colors"
              >
                Read more stories
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <PawPrint className="absolute top-10 left-10 w-32 h-32 text-white" />
          <PawPrint className="absolute bottom-10 right-10 w-24 h-24 text-white rotate-45" />
          <PawPrint className="absolute top-1/2 left-1/3 w-20 h-20 text-white -rotate-12" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            Ready to give your pet the care they deserve?
          </h2>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
            Book an appointment, browse our shop, or explore a subscription plan — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-primary-700 font-semibold hover:bg-cream-100 transition-colors"
            >
              Book Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-900 text-white font-semibold border border-primary-700 hover:bg-primary-950 transition-colors"
            >
              Visit Shop
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
