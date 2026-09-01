import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  bgImage?: string;
}

export default function PageHeader({ title, subtitle, breadcrumbs, bgImage }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-primary-900">
      {bgImage && (
        <div className="absolute inset-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 to-primary-900/90" />
        </div>
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm text-primary-200 mb-4 animate-fade-in">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-cream-50 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-cream-50">{crumb.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white animate-fade-in-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-primary-200 max-w-2xl animate-fade-in-up leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
