import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import { ShoppingBag, Search, User, Menu, X, Heart, Phone, MapPin, Mail, LogOut, Trash2, Package } from 'lucide-react';
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { ProductDetails } from './pages/ProductDetails';
import { Orders } from './pages/Orders';
import { StaticPage } from './pages/StaticPage';
import { AuthModal } from './components/AuthModal';
import { ChatBot } from './components/ChatBot';
import { motion, AnimatePresence } from 'framer-motion';

// --- Layout Components ---

const TopBar = () => (
  <div className="bg-gray-100 text-xs py-2 border-b border-gray-200 hidden md:block">
    <div className="container mx-auto px-4 flex justify-between text-gray-600">
      <div className="flex gap-4">
        <span className="flex items-center gap-1"><MapPin size={12} /> Douala, Cameroun</span>
        <span className="flex items-center gap-1"><Mail size={12} /> support@electro.com</span>
      </div>
      <div className="flex gap-4">
        <Link to="/help" className="hover:text-primary">Aide</Link>
        <Link to="/orders" className="hover:text-primary">Suivre ma commande</Link>
      </div>
    </div>
  </div>
);

const Header = () => {
  const { cart, user, setLoginModalOpen, logout, removeFromCart, total } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="text-3xl font-black text-gray-800 tracking-tighter flex items-center gap-1">
              <ShoppingBag className="text-primary mb-1" size={32} />
              ELECTRO<span className="text-primary">.</span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
              <input 
                type="text" 
                placeholder="Rechercher un produit..." 
                className="w-full bg-gray-100 border-0 rounded-full py-3 px-6 pr-12 focus:ring-2 focus:ring-primary/20 outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary/90">
                <Search size={18} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* User */}
              <div className="relative group">
                {user ? (
                   <button className="flex items-center gap-2 text-gray-700 hover:text-primary font-medium">
                     <User size={24} />
                     <span className="hidden md:block max-w-[100px] truncate">{user.name}</span>
                   </button>
                ) : (
                  <button onClick={() => setLoginModalOpen(true)} className="flex items-center gap-2 text-gray-700 hover:text-primary">
                    <User size={24} />
                    <span className="hidden md:block">Login</span>
                  </button>
                )}
                
                {/* User Dropdown */}
                {user && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                    <div className="p-2 space-y-1">
                       <Link to="/orders" className="flex items-center gap-2 w-full p-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                          <Package size={16} /> Mes Commandes
                       </Link>
                       <button onClick={logout} className="flex items-center gap-2 w-full p-2 text-red-500 hover:bg-red-50 rounded-lg">
                         <LogOut size={16} /> Déconnexion
                       </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Trigger */}
              <button onClick={() => setIsCartOpen(true)} className="relative text-gray-700 hover:text-primary transition-colors">
                <ShoppingBag size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              {...{
                initial: { height: 0 },
                animate: { height: 'auto' },
                exit: { height: 0 }
              } as any}
              className="md:hidden bg-gray-50 border-t overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-4 font-medium">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Boutique</Link>
                {user && <Link to="/orders" onClick={() => setIsMenuOpen(false)}>Mes Commandes</Link>}
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              {...{
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 }
              } as any}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            <motion.div 
              {...{
                initial: { x: '100%' },
                animate: { x: 0 },
                exit: { x: '100%' }
              } as any}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <ShoppingBag className="text-primary" /> Mon Panier
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-400 mt-20">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Votre panier est vide</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-gray-50 rounded-lg" />
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)}>
                          <h4 className="font-bold text-sm line-clamp-2 hover:text-primary">{item.name}</h4>
                        </Link>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-primary font-bold">${item.price} x {item.quantity}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-gray-50 border-t">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    if (cart.length > 0) {
                      if(!user) setLoginModalOpen(true);
                      else navigate('/checkout');
                    }
                  }}
                  disabled={cart.length === 0}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  Procéder au paiement
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => (
  <footer className="bg-dark text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-1">
            <ShoppingBag className="text-primary" /> ELECTRO<span className="text-primary">.</span>
          </h3>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            Votre destination numéro un pour l'électronique de pointe. Qualité, garantie et service client exceptionnel.
          </p>
          <div className="flex gap-4 text-gray-400">
            <MapPin size={18} /> Douala, Cameroun
          </div>
          <div className="flex gap-4 text-gray-400 mt-2">
            <Phone size={18} /> +237 692314218
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-6">Liens Rapides</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-primary transition">À Propos</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition">Politique de Confidentialité</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition">Conditions Générales</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Service Client</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/orders" className="hover:text-primary transition">Mon Compte</Link></li>
            <li><Link to="/orders" className="hover:text-primary transition">Suivre ma commande</Link></li>
            <li><Link to="/faq" className="hover:text-primary transition">Retours & FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">Inscrivez-vous pour recevoir nos meilleures offres.</p>
          <div className="flex">
            <input type="email" placeholder="Votre email" className="bg-gray-800 border-none text-white px-4 py-2 rounded-l-lg w-full focus:ring-1 focus:ring-primary outline-none" />
            <button className="bg-primary px-4 py-2 rounded-r-lg font-bold hover:bg-secondary transition-colors">OK</button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        &copy; 2023 Electro Store. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col font-sans">
          <TopBar />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/orders" element={<Orders />} />
              
              {/* Static Pages Routes */}
              <Route path="/about" element={<StaticPage title="À Propos" type="about" />} />
              <Route path="/contact" element={<StaticPage title="Contactez-nous" type="contact" />} />
              <Route path="/faq" element={<StaticPage title="Foire Aux Questions" type="faq" />} />
              <Route path="/privacy" element={<StaticPage title="Politique de Confidentialité" type="privacy" />} />
              <Route path="/terms" element={<StaticPage title="Conditions Générales" type="terms" />} />
              <Route path="/help" element={<StaticPage title="Centre d'Aide" type="faq" />} />
            </Routes>
          </main>
          <Footer />
          
          <AuthModal />
          <ChatBot />
        </div>
      </Router>
    </StoreProvider>
  );
}