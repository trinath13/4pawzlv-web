import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, MessageSquare, PawPrint } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.');
      setSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    setSuccess(true);
    setSubmitting(false);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have a question, a special request, or just want to say hello? We would love to hear from you and your furry friends."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
        bgImage="https://images.pexels.com/photos/6235020/pexels-photo-6235020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-16 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact info cards */}
            <div className="lg:col-span-2 space-y-4">
              {[
                {
                  icon: Phone,
                  title: 'Call Us',
                  lines: ['(555) 017-2839', 'Mon–Sat, 8am–7pm'],
                  color: 'bg-primary-100 text-primary-700',
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  lines: ['hello@4pawzlv.com', 'We reply within 24 hours'],
                  color: 'bg-secondary-100 text-secondary-700',
                },
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  lines: ['24 Pawprint Lane', 'Sunnyvale, CA 94086'],
                  color: 'bg-accent-100 text-accent-600',
                },
                {
                  icon: Clock,
                  title: 'Opening Hours',
                  lines: ['Mon–Fri: 8am – 7pm', 'Sat–Sun: 9am – 5pm'],
                  color: 'bg-primary-100 text-primary-700',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border border-primary-100 flex items-start gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary-900">{item.title}</h3>
                    {item.lines.map((line, i) => (
                      <p key={i} className={i === 0 ? 'text-gray-700 font-medium' : 'text-sm text-gray-500'}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bg-white rounded-2xl border border-primary-100 overflow-hidden">
                <div className="relative h-56 bg-gradient-to-br from-primary-100 via-cream-100 to-secondary-100 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20">
                    <PawPrint className="absolute top-6 left-8 w-10 h-10 text-primary-600" />
                    <PawPrint className="absolute bottom-8 right-10 w-8 h-8 text-primary-600 rotate-45" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-primary-800">Sunnyvale, California</p>
                    <p className="text-xs text-gray-500">Free parking available on-site</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl shadow-primary-900/5 p-6 sm:p-10 border border-primary-100">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                      <Check className="w-10 h-10 text-success-600" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-primary-900 mb-3">
                      Message Sent!
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
                      Thank you for reaching out. Our team will get back to you within 24 hours. In the meantime, feel free to browse our services or book an appointment.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-primary-700" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold text-primary-900">Send a Message</h2>
                        <p className="text-sm text-gray-500">We typically respond within 24 hours.</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-primary-900 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Jane Doe"
                            className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-primary-900 mb-2">
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
                      <div>
                        <label className="block text-sm font-semibold text-primary-900 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={form.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          placeholder="How can we help?"
                          className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary-900 mb-2">
                          Message *
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          rows={6}
                          placeholder="Tell us about your pet and what you need..."
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
                        className="w-full py-4 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 active:scale-[0.99] transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {submitting ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
