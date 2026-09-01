import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/4pawzlv_logo_1.png"
                alt="4pawzlv logo"
                className="h-12 w-12 rounded-xl object-cover shadow-lg ring-1 ring-primary-700"
              />
              <span className="font-display text-2xl font-bold text-white tracking-tight">
                4pawzlv
              </span>
            </Link>
            <p className="text-sm text-primary-200 leading-relaxed max-w-xs">
              Premium pet care services, products, and subscriptions for the companions you love most.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4.5 h-4.5 text-cream-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/services', label: 'Services' },
                { to: '/shop', label: 'Shop Products' },
                { to: '/subscriptions', label: 'My Subscriptions' },
                { to: '/book', label: 'Book Online' },
                { to: '/blog', label: 'Blog' },
                { to: '/testimonials', label: 'Testimonials' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-200 hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'FAQs', to: '/subscriptions' },
                { label: 'Shipping & Returns', to: '/shop' },
                { label: 'Privacy Policy', to: '/' },
                { label: 'Terms of Service', to: '/' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-primary-200 hover:text-cream-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-200">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <span>24 Pawprint Lane, Sunnyvale CA 94086</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-200">
                <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                <span>(555) 017-2839</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-200">
                <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                <span>hello@4pawzlv.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-300">
            © 2026 4pawzlv Pet Care. All rights reserved.
          </p>
          <p className="text-sm text-primary-300">
            Made with care for every paw, whisker, and tail.
          </p>
        </div>
      </div>
    </footer>
  );
}
