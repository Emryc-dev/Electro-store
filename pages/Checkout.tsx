import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { PaymentMethod } from '../types';
import { motion } from 'framer-motion';

export const Checkout = () => {
  const { cart, total, user, clearCart, setLoginModalOpen, addOrder } = useStore();
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentMethod>('ORANGE_MONEY');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'REVIEW' | 'PAYMENT' | 'SUCCESS'>('REVIEW');

  // Fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvc: '' });

  // Check auth on mount
  useEffect(() => {
    if (!user) {
      setLoginModalOpen(true);
      // Wait for user to maybe login, if not redirected, the modal handles UI
    }
  }, [user, setLoginModalOpen]);

  const handlePayment = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Create Order Record
      const newOrder = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toISOString(),
        items: [...cart],
        total: total,
        status: 'En cours' as const,
        paymentMethod: method
      };
      
      addOrder(newOrder);
      setIsLoading(false);
      setStep('SUCCESS');
      clearCart();
    }, 2000);
  };

  if (step === 'SUCCESS') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <motion.div 
          {...{
            initial: { scale: 0 },
            animate: { scale: 1 }
          } as any}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="text-green-500 w-12 h-12" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Paiement Réussi !</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Merci {user?.name}. Votre commande a été confirmée. Vous recevrez un email de confirmation sous peu.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/orders')}
            className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition"
          >
            Voir ma commande
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary/90 transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Votre panier est vide</h2>
        <button onClick={() => navigate('/')} className="text-primary underline">Retourner à la boutique</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Caisse</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Summary (Collapsed in Mobile) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Récapitulatif</h3>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                     <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Moyen de Paiement</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <button 
                onClick={() => setMethod('ORANGE_MONEY')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${method === 'ORANGE_MONEY' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <Smartphone className="text-orange-500" />
                <span className="font-bold text-sm">Orange Money</span>
              </button>
              <button 
                onClick={() => setMethod('MTN_MONEY')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${method === 'MTN_MONEY' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <Smartphone className="text-yellow-500" />
                <span className="font-bold text-sm">MTN MoMo</span>
              </button>
              <button 
                onClick={() => setMethod('CARD')}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${method === 'CARD' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <CreditCard className="text-blue-500" />
                <span className="font-bold text-sm">Carte Bancaire</span>
              </button>
            </div>

            {/* Dynamic Form */}
            <div className="max-w-md mx-auto">
              {(method === 'ORANGE_MONEY' || method === 'MTN_MONEY') && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                  <input 
                    type="tel" 
                    placeholder="ex: 699 99 99 99" 
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <p className="text-xs text-gray-500">Vous recevrez une notification USSD pour valider le paiement.</p>
                </div>
              )}

              {method === 'CARD' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Carte</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                      <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input type="text" placeholder="123" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Total */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="text-lg font-bold mb-4">Total à Payer</h3>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Sous-total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Livraison</span>
              <span className="text-green-600">Gratuit</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-2xl font-bold text-gray-800 mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {!user ? (
               <button 
                 onClick={() => setLoginModalOpen(true)}
                 className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
               >
                 Se connecter pour payer
               </button>
            ) : (
              <button 
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Traitement...' : 'Confirmer le Paiement'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};