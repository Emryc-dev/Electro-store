import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, toggleLike, isLiked } = useStore();
  const liked = isLiked(product.id);

  return (
    <motion.div 
      {...{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true }
      } as any}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
        )}
        {product.isSale && (
          <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
        )}
      </div>

      {/* Image & Quick Actions */}
      <div className="relative h-64 overflow-hidden p-4 bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        
        {/* Hover Actions */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <button 
            onClick={() => toggleLike(product.id)}
            className={`p-2 rounded-full shadow-md transition-colors ${liked ? 'bg-secondary text-white' : 'bg-white hover:bg-primary hover:text-white'}`}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
          <Link to={`/product/${product.id}`} className="p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors">
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">{product.name}</h3>
        </Link>
        
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {product.oldPrice && <span className="text-xs text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>}
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="p-3 rounded-full border border-gray-200 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};