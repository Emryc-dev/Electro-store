import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { useStore } from '../context/StoreContext';
import { Star, ShoppingCart, Truck, ShieldCheck, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useStore();
  const product = MOCK_PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h2>
        <Link to="/" className="text-primary underline">Retour à l'accueil</Link>
      </div>
    );
  }

  // Generic description since mock doesn't have one
  const description = "Ce produit exceptionnel combine performance de pointe et design élégant. Fabriqué avec des matériaux premium, il garantit durabilité et satisfaction utilisateur. Parfait pour un usage quotidien ou professionnel, il répondra à toutes vos exigences technologiques.";

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={18} /> Retour à la boutique
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images Column */}
        <motion.div 
          {...{
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 }
          } as any}
          className="space-y-4"
        >
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 aspect-square flex items-center justify-center relative overflow-hidden group">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain max-h-[500px] transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-4 right-4 flex flex-col gap-3">
               <button className="p-3 bg-white rounded-full shadow-lg hover:text-red-500 transition-colors">
                 <Heart size={20} />
               </button>
               <button className="p-3 bg-white rounded-full shadow-lg hover:text-primary transition-colors">
                 <Share2 size={20} />
               </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[...Array(4)].map((_, i) => (
               <div key={i} className={`bg-gray-50 rounded-xl p-2 cursor-pointer border-2 ${i === 0 ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}>
                 <img src={product.image} alt="thumbnail" className="w-full h-full object-contain" />
               </div>
             ))}
          </div>
        </motion.div>

        {/* Info Column */}
        <motion.div 
          {...{
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 }
          } as any}
        >
          <div className="mb-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {product.category}
            </span>
            {product.isNew && <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Nouveau</span>}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={20} className={i < product.rating ? "fill-current" : "text-gray-200 fill-gray-200"} />
               ))}
            </div>
            <span className="text-gray-500 text-sm">(124 Avis)</span>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xl text-gray-400 line-through mb-1">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{description}</p>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <ShoppingCart size={20} /> Ajouter au panier
            </button>
          </div>

          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center gap-3 text-gray-700">
              <Truck className="text-primary" />
              <span className="text-sm">Livraison gratuite pour les membres</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <ShieldCheck className="text-primary" />
              <span className="text-sm">Garantie constructeur de 2 ans</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs / Reviews Section */}
      <div className="mt-20">
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button className="pb-4 border-b-2 border-primary text-primary font-bold">Description</button>
            <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-800">Spécifications</button>
            <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-800">Avis Clients</button>
          </div>
        </div>
        <div className="text-gray-600 leading-relaxed max-w-4xl">
           <p className="mb-4">
             Découvrez l'excellence technologique avec le {product.name}. Conçu pour repousser les limites, cet appareil intègre les dernières innovations en matière de performance et d'ergonomie. 
           </p>
           <p>
             Que vous soyez un professionnel exigeant ou un passionné de technologie, ce produit saura s'adapter à vos besoins grâce à sa polyvalence et sa fiabilité à toute épreuve. Profitez d'une expérience utilisateur fluide et intuitive dès la première utilisation.
           </p>
        </div>
      </div>
    </div>
  );
};