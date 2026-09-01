import { useEffect, useState } from 'react';
import { Check, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { SubscriptionPlan } from '@/types';
import PageHeader from '@/components/PageHeader';

export default function Subscriptions() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('subscription_plans').select('*').order('price');
      setPlans(data ?? []);
      setLoading(false);
    })();
  }, []);

  const handleSubscribe = (planName: string) => {
    setSubscribed(planName);
    setTimeout(() => setSubscribed(null), 4000);
  };

  return (
    <>
      <PageHeader
        title="My Subscriptions"
        subtitle="Recurring care plans that keep your pet healthy, groomed, and happy — with savings and priority booking built in. Cancel anytime."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'My Subscriptions' }]}
        bgImage="https://images.pexels.com/photos/6131149/pexels-photo-6131149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-16 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {subscribed && (
            <div className="mb-8 p-4 bg-success-50 border border-success-200 rounded-xl flex items-center gap-3 animate-fade-in-up">
              <Check className="w-5 h-5 text-success-600" />
              <p className="text-sm font-medium text-success-800">
                You have subscribed to the {subscribed} plan. A confirmation email is on its way.
              </p>
            </div>
          )}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="w-full h-32 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                    plan.popular
                      ? 'border-primary-500 bg-white shadow-2xl shadow-primary-500/15 lg:scale-105'
                      : 'border-primary-100 bg-white hover:shadow-xl'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center gap-1.5 whitespace-nowrap">
                      <Crown className="w-3.5 h-3.5" />
                      Most Popular
                    </div>
                  )}
                  <div className="relative h-40 overflow-hidden rounded-t-[calc(1rem-2px)]">
                    <img
                      src={plan.image_url}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {plan.popular && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-bold text-primary-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{plan.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold text-primary-700">
                        ${plan.price}
                      </span>
                      <span className="text-sm text-gray-500">/{plan.billing_cycle}</span>
                    </div>
                    <ul className="mt-5 space-y-3 flex-1">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <div className="w-5 h-5 rounded-full bg-success-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-success-600" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleSubscribe(plan.name)}
                      className={`mt-6 w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
                        plan.popular
                          ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20'
                          : 'bg-cream-100 text-primary-700 border border-primary-200 hover:bg-primary-50'
                      }`}
                    >
                      Subscribe Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FAQ section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-primary-900 text-center mb-10">
              Subscription FAQs
            </h2>
            <div className="space-y-4">
              {[
                { q: 'Can I cancel anytime?', a: 'Yes. You can cancel your subscription at any time from your account or by contacting us. You will keep access until the end of your current billing cycle.' },
                { q: 'Can I switch plans?', a: 'Absolutely. Upgrades take effect immediately, and downgrades take effect at the next billing cycle so you keep what you have paid for.' },
                { q: 'What is priority booking?', a: 'Subscribers can book appointments two weeks ahead of non-subscribers, giving you first pick of the best time slots.' },
                { q: 'Do plans include products?', a: 'Some plans include monthly food or treat deliveries. See each plan\'s feature list for details on what is included.' },
              ].map((faq) => (
                <details key={faq.q} className="group bg-white rounded-xl border border-primary-100 overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-primary-900 list-none">
                    {faq.q}
                    <span className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 group-open:rotate-45 transition-transform text-lg">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
              >
                Book a Service
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
