import React from 'react';
import { useStore } from '../context/StoreContext';
import { Link, Navigate } from 'react-router-dom';
import { Package, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export const Orders = () => {
  const { user, orders, isLoginModalOpen, setLoginModalOpen } = useStore();

  if (!user) {
    // If not logged in, prompt modal and redirect or show simplified view
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <Package size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Connectez-vous</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Veuillez vous connecter pour accéder à l'historique de vos commandes.
        </p>
        <button 
          onClick={() => setLoginModalOpen(true)}
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary/90 transition"
        >
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Mes Commandes</h1>
      <p className="text-gray-500 mb-8">Historique de vos achats chez Electro.</p>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Aucune commande</h3>
          <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande.</p>
          <Link to="/" className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-primary/90 transition">
            Commencer vos achats
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div 
              key={order.id}
              {...{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: index * 0.1 }
              } as any}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="bg-gray-50 p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div>
                    <span className="block text-xs text-gray-500 uppercase font-bold">Commande N°</span>
                    <span className="font-mono font-bold text-gray-800">#{order.id}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 uppercase font-bold">Date</span>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-400" />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 uppercase font-bold">Total</span>
                    <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div>
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                     order.status === 'Livré' ? 'bg-green-100 text-green-700' : 
                     order.status === 'En cours' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                   }`}>
                     {order.status}
                   </span>
                </div>
              </div>

              {/* Items */}
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`} className="font-bold text-gray-800 hover:text-primary hover:underline line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">Qté: {item.quantity} × ${item.price}</p>
                      </div>
                      <div className="text-right">
                        <Link to={`/product/${item.id}`} className="text-sm font-semibold text-secondary hover:underline">
                          Racheter
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};