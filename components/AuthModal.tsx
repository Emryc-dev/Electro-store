import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthModal = () => {
  const { isLoginModalOpen, setLoginModalOpen, login } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email && password) {
      login(email);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          {...{
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 }
          } as any}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          <button 
            onClick={() => setLoginModalOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-primary mb-2 text-center">
              {isLogin ? 'Bienvenue' : 'Créer un compte'}
            </h2>
            <p className="text-gray-500 text-center mb-8">
              {isLogin ? 'Connectez-vous pour continuer vos achats' : 'Rejoignez la communauté Electro'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Nom complet" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse email" 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Mot de passe" 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/30 transition-all transform hover:scale-[1.02]"
              >
                {isLogin ? 'Se connecter' : "S'inscrire"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-secondary font-semibold hover:underline"
                >
                  {isLogin ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};