export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'En cours' | 'Livré' | 'Annulé';
  paymentMethod: string;
}

export type PaymentMethod = 'ORANGE_MONEY' | 'MTN_MONEY' | 'CARD';