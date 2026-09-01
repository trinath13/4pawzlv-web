import { Link } from 'react-router-dom';
import { PawPrint, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-cream-50">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center mb-6 shadow-xl shadow-primary-500/20">
        <PawPrint className="w-12 h-12 text-white" />
      </div>
      <h1 className="font-display text-6xl font-bold text-primary-900 mb-3">404</h1>
      <p className="font-display text-2xl font-semibold text-primary-700 mb-2">Page not found</p>
      <p className="text-gray-500 max-w-md mb-8">
        It looks like this page wandered off. Let us help you find your way back home.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}
