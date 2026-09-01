import { Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-primary-100 hover:shadow-xl hover:shadow-primary-900/10 transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-full shadow-lg">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-1.5 mb-2">
          <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
          <span className="text-sm font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">· {product.category}</span>
        </div>
        <h3 className="font-display text-base font-semibold text-primary-900 leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-primary-700">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
