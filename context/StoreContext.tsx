import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Product, User, Order } from '../types';

interface StoreContextType {
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  isLoginModalOpen: boolean;
  likedProducts: number[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  login: (email: string) => void;
  logout: () => void;
  setLoginModalOpen: (isOpen: boolean) => void;
  toggleLike: (productId: number) => void;
  isLiked: (productId: number) => boolean;
  total: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const login = (email: string) => {
    // Simulating user data
    setUser({ name: email.split('@')[0], email });
    setLoginModalOpen(false);
  };

  const logout = () => setUser(null);

  const toggleLike = (productId: number) => {
    setLikedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isLiked = (productId: number) => {
    return likedProducts.includes(productId);
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      cart, orders, user, isLoginModalOpen, likedProducts,
      addToCart, removeFromCart, clearCart, addOrder,
      login, logout, setLoginModalOpen, toggleLike, isLiked,
      total
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};