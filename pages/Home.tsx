import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Truck, RotateCcw, ShieldCheck, Phone, Filter, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple Hero Slider Component
const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Laptop Collection",
      subtitle: "Save up to 40% off"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "New Accessories",
      subtitle: "Discover the future"
    }
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center container mx-auto px-4 md:px-8">
            <div className="max-w-xl text-white">
              <motion.p 
                key={`sub-${index}`}
                {...{
                  initial: { y: 20, opacity: 0 },
                  animate: { y: 0, opacity: 1 }
                } as any}
                className="text-secondary font-bold text-lg mb-2 uppercase tracking-widest"
              >
                {slide.subtitle}
              </motion.p>
              <motion.h1 
                key={`tit-${index}`}
                {...{
                  initial: { y: 30, opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  transition: { delay: 0.1 }
                } as any}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                {slide.title}
              </motion.h1>
              <motion.button 
                key={`btn-${index}`}
                {...{
                  initial: { y: 40, opacity: 0 },
                  animate: { y: 0, opacity: 1 },
                  transition: { delay: 0.2 }
                } as any}
                className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full font-bold transition-colors"
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Home = () => {
  
  // Filter States
  const [specialFilter, setSpecialFilter] = useState('All'); // 'All', 'New', 'Sale'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [minRating, setMinRating] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtering Logic
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    // Special Tabs
    if (specialFilter === 'New' && !product.isNew) return false;
    if (specialFilter === 'Sale' && !product.isSale) return false;

    // Category
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;

    // Price
    if (product.price < priceRange.min || product.price > priceRange.max) return false;

    // Rating
    if (product.rating < minRating) return false;

    return true;
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange({ min: 0, max: 2000 });
    setMinRating(0);
    setSpecialFilter('All');
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Categories</h3>
        <div className="space-y-3">
          {['All', ...CATEGORIES].map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCategory === cat ? 'border-primary' : 'border-gray-200 group-hover:border-primary/50'}`}>
                {selectedCategory === cat && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <span className={`text-sm ${selectedCategory === cat ? 'text-primary font-bold' : 'text-gray-600 group-hover:text-primary'} transition-colors`}>
                {cat}
              </span>
              <input 
                type="radio" 
                name="category" 
                className="hidden" 
                checked={selectedCategory === cat} 
                onChange={() => {
                  setSelectedCategory(cat);
                  setIsMobileFilterOpen(false);
                }} 
              />
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Prix</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2 text-gray-400 text-xs">$</span>
            <input 
              type="number" 
              value={priceRange.min} 
              onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
              className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
              placeholder="Min"
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-2 text-gray-400 text-xs">$</span>
            <input 
              type="number" 
              value={priceRange.max} 
              onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
              className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
              placeholder="Max"
            />
          </div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="2000" 
          step="50"
          value={priceRange.max} 
          onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Notes</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(star => (
            <button 
              key={star}
              onClick={() => {
                setMinRating(minRating === star ? 0 : star);
                setIsMobileFilterOpen(false);
              }}
              className={`flex items-center gap-2 text-sm w-full py-2 px-3 rounded-lg transition-colors ${minRating === star ? 'bg-primary/5 border border-primary/10' : 'hover:bg-gray-50'}`}
            >
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < star ? "fill-current" : "text-gray-200 fill-gray-200"} />
                ))}
              </div>
              <span className={`text-xs ${minRating === star ? 'font-bold text-primary' : 'text-gray-500'}`}>& Up</span>
            </button>
          ))}
        </div>
      </div>
      
      <button onClick={clearFilters} className="w-full py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all">
        Réinitialiser les filtres
      </button>
    </div>
  );

  return (
    <div className="pb-12 bg-white">
      <HeroSlider />

      {/* Services */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-lg">
          {[
            { icon: Truck, title: "Livraison Gratuite", text: "Pour toute commande > $50" },
            { icon: RotateCcw, title: "Retour Gratuit", text: "Satisfait ou remboursé 30j" },
            { icon: ShieldCheck, title: "Paiement Sécurisé", text: "Transactions cryptées" },
            { icon: Phone, title: "Support 24/7", text: "Service client dédié" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-2 border-b md:border-b-0 md:border-r last:border-0 border-gray-100">
              <item.icon size={32} className="text-secondary" />
              <div>
                <h6 className="font-bold uppercase text-sm">{item.title}</h6>
                <p className="text-xs text-gray-500">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Mobile Filter Button */}
          <div className="md:hidden flex justify-between items-center mb-4">
             <button 
               onClick={() => setIsMobileFilterOpen(true)}
               className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg font-bold text-gray-700"
             >
               <Filter size={18} /> Filtres
             </button>
             <span className="text-sm text-gray-500">{filteredProducts.length} Produits</span>
          </div>

          {/* Sidebar (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
             <div className="sticky top-24">
               <FilterContent />
             </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {isMobileFilterOpen && (
              <>
                <motion.div 
                  {...{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 }
                  } as any}
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm md:hidden"
                />
                <motion.div 
                  {...{
                    initial: { x: '-100%' },
                    animate: { x: 0 },
                    exit: { x: '-100%' }
                  } as any}
                  className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto md:hidden"
                >
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-bold text-lg">Filtres</h2>
                    <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
                  </div>
                  <div className="p-6">
                    <FilterContent />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Nos Produits</h2>
                <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} résultats trouvés</p>
              </div>
              
              <div className="flex p-1 bg-gray-100 rounded-lg">
                {[
                  { id: 'All', label: 'Tout' },
                  { id: 'New', label: 'Nouveautés' },
                  { id: 'Sale', label: 'Promos' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSpecialFilter(tab.id)}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                      specialFilter === tab.id ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div 
                {...{ layout: true } as any}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-800">Aucun produit trouvé</h3>
                <p className="text-gray-500 mb-6">Essayez de modifier vos filtres de recherche.</p>
                <button onClick={clearFilters} className="text-primary font-bold hover:underline">
                  Effacer tous les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="relative rounded-2xl overflow-hidden group h-64 bg-gray-100">
             <img src="../img/mackbook.jpg" alt="Banner" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black/30 flex flex-col justify-center p-8">
               <h3 className="text-white text-3xl font-bold mb-2">MacBook Pro</h3>
               <p className="text-gray-200 mb-4">La puissance à l'état pur</p>
               <button className="bg-white text-gray-900 px-6 py-2 rounded-full w-fit font-bold hover:bg-secondary hover:text-white transition-colors">Découvrir</button>
             </div>
           </div>
           <div className="relative rounded-2xl overflow-hidden group h-64 bg-gray-100">
             <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Banner" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
             <div className="absolute inset-0 bg-secondary/80 flex flex-col justify-center p-8">
               <h3 className="text-white text-3xl font-bold mb-2">Offre Spéciale</h3>
               <p className="text-white mb-4">Jusqu'à -50% sur les accessoires</p>
               <button className="bg-gray-900 text-white px-6 py-2 rounded-full w-fit font-bold hover:bg-white hover:text-secondary transition-colors">Profiter</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};