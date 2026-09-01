import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingBag, Bell, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/shop', label: 'Shop' },
  { to: '/subscriptions', label: 'My Subscriptions' },
  { to: '/book', label: 'Book Online' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About Us' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-md'
          : 'bg-cream-50/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/4pawzlv_logo_1.png"
              alt="4pawzlv logo"
              className="h-11 w-11 rounded-xl object-cover shadow-md shadow-primary-900/20 ring-1 ring-primary-200/60 group-hover:scale-105 transition-transform"
            />
            <span className="font-display text-xl font-bold text-primary-900 tracking-tight">
              4pawzlv
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-lg text-gray-500 hover:text-primary-700 hover:bg-primary-50 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/notifications"
              className="relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-primary-700 hover:bg-primary-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full ring-2 ring-cream-50" />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-primary-700 hover:bg-primary-50 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-cream-50 animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-primary-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-primary-100 bg-cream-50 animate-fade-in">
          <div className="px-4 py-4 space-y-1 max-w-7xl mx-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-primary-700 bg-primary-100'
                      : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
