import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Canon EOS Rebel T7i Kit",
    category: "Cameras",
    price: 899.99,
    oldPrice: 1050.00,
    image: "/img/product-1.png",
    rating: 5,
    isNew: true
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro",
    category: "Smartphones",
    price: 999.00,
    oldPrice: 1199.00,
    image: "/img/product-2.png",
    rating: 4,
    isSale: true
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    price: 348.00,
    image: "/img/product-3.png",
    rating: 5
  },
  {
    id: 4,
    name: "MacBook Air M2",
    category: "Laptops",
    price: 1199.00,
    image: "/img/product-4.png",
    rating: 5,
    isNew: true
  },
  {
    id: 5,
    name: "Samsung Galaxy Watch 6",
    category: "Smartwatch",
    price: 299.99,
    oldPrice: 349.99,
    image: "/img/product-5.png",
    rating: 4,
    isSale: true
  },
  {
    id: 6,
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: 99.99,
    image: "/img/product-6.png",
    rating: 5
  },
  {
    id: 7,
    name: "iPad Air 5",
    category: "Tablets",
    price: 599.00,
    image: "/img/product-7.png",
    rating: 4
  },
  {
    id: 8,
    name: "PlayStation 5",
    category: "Gaming",
    price: 499.00,
    image: "/img/ps5.jpg",
    rating: 5,
    isNew: true
  }
];

export const CATEGORIES = [
  "Laptops", "Smartphones", "Cameras", "Accessories", "Gaming", "Tablets"
];