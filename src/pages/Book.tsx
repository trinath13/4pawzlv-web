import { useEffect, useState } from 'react';
import { Calendar, Clock, Check, PawPrint, User, Mail, Dog, Cat, Bird, Stethoscope } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Service } from '@/types';
import PageHeader from '@/components/PageHeader';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const petTypes = [
  { value: 'Dog', icon: Dog },
  { value: 'Cat', icon: Cat },
  { value: 'Bird', icon: Bird },
  { value: 'Other', icon: PawPrint },
];

export default function Book() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    service_id: '',
    customer_name: '',
    email: '',
    pet_name: '',
    pet_type: 'Dog',
    booking_date: '',
    time_slot: '',
    notes: '',
  });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('services').select('*').order('name');
      setServices(data ?? []);
      setLoading(false);
    })();
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!form.service_id || !form.customer_name || !form.email || !form.pet_name || !form.booking_date || !form.time_slot) {
      setError('Please fill in all required fields.');
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from('bookings').insert({
      service_id: form.service_id || null,
      customer_name: form.customer_name,
      email: form.email,
      pet_name: form.pet_name,
      pet_type: form.pet_type,
      booking_date: form.booking_date,
      time_slot: form.time_slot,
      notes: form.notes || null,
      status: 'pending',
    });

    if (insertError) {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setSubmitting(false);
    setForm({
      service_id: '',
      customer_name: '',
      email: '',
      pet_name: '',
      pet_type: 'Dog',
      booking_date: '',
      time_slot: '',
      notes: '',
    });
  };

  const today = new Date().toISOString().split('T')[0];

  if (success) {
    return (
      <>
        <PageHeader
          title="Book Online"
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Book Online' }]}
          bgImage="https://images.pexels.com/photos/6235650/pexels-photo-6235650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        />
        <section className="py-20 bg-cream-50">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Check className="w-10 h-10 text-success-600" />
            </div>
            <h2 className="font-display text-3xl font-bold text-primary-900 mb-3">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We have received your booking request and sent a confirmation to your email. Our team will reach out shortly to finalize the details.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Book Online"
        subtitle="Reserve your pet's next grooming, vet, training, or boarding session in under a minute."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Book Online' }]}
        bgImage="https://images.pexels.com/photos/19145874/pexels-photo-19145874.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-16 bg-cream-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-primary-900/5 p-6 sm:p-10 border border-primary-100 space-y-8">
            {/* Service Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-primary-900 mb-3">
                <Stethoscope className="w-4 h-4" />
                Select a Service *
              </label>
              {loading ? (
                <div className="h-12 bg-cream-100 rounded-xl animate-pulse" />
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleChange('service_id', service.id)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        form.service_id === service.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-primary-100 hover:border-primary-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-primary-900">{service.name}</span>
                        <span className="font-bold text-primary-700 text-sm">${service.price}</span>
                      </div>
                      <p className="text-xs text-gray-500">{service.category}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pet Info */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary-900 mb-3">
                  <PawPrint className="w-4 h-4" />
                  Pet Name *
                </label>
                <input
                  type="text"
                  value={form.pet_name}
                  onChange={(e) => handleChange('pet_name', e.target.value)}
                  placeholder="e.g. Bella"
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-3">Pet Type *</label>
                <div className="flex gap-2">
                  {petTypes.map((pt) => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => handleChange('pet_type', pt.value)}
                      className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                        form.pet_type === pt.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-primary-100 text-gray-500 hover:border-primary-300'
                      }`}
                    >
                      <pt.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{pt.value}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary-900 mb-3">
                  <User className="w-4 h-4" />
                  Your Name *
                </label>
                <input
                  type="text"
                  value={form.customer_name}
                  onChange={(e) => handleChange('customer_name', e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary-900 mb-3">
                  <Mail className="w-4 h-4" />
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary-900 mb-3">
                  <Calendar className="w-4 h-4" />
                  Date *
                </label>
                <input
                  type="date"
                  min={today}
                  value={form.booking_date}
                  onChange={(e) => handleChange('booking_date', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-primary-900 mb-3">
                  <Clock className="w-4 h-4" />
                  Time Slot *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleChange('time_slot', slot)}
                      className={`px-2 py-2.5 rounded-lg text-xs font-medium transition-all ${
                        form.time_slot === slot
                          ? 'bg-primary-600 text-white'
                          : 'bg-cream-100 text-gray-600 hover:bg-primary-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-3">
                Additional Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
                placeholder="Any special instructions, allergies, or behaviors we should know about..."
                className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all resize-none"
              />
            </div>

            {error && (
              <div className="p-4 bg-error-50 border border-error-200 rounded-xl text-sm text-error-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all shadow-lg shadow-primary-500/20 disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
