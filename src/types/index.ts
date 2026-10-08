export type ProductCategory = 'Earbuds' | 'Handsfree' | 'Headphones';

export type ProductSubcategory =
  | 'Wireless Earbuds'
  | 'TWS Earbuds'
  | 'Premium Earbuds'
  | 'Noise-Cancelling Earbuds'
  | 'Gaming Earbuds'
  | 'Wired Handsfree'
  | 'Bluetooth Handsfree'
  | 'Premium Handsfree'
  | 'Wireless Headphones'
  | 'Bluetooth Headphones'
  | 'Noise-Cancelling Headphones'
  | 'Gaming Headphones'
  | 'Premium Over-Ear Headphones';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
  features: string[];
  specs: {
    driver: string;
    battery: string;
    connectivity: string;
    frequency: string;
    anc?: string;
    latency?: string;
    waterproof?: string;
  };
  colors: { name: string; hex: string }[];
  inStock: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  soundProfile: 'Balanced Neutral' | 'Deep Bass' | 'Warm Audiophile' | 'Spatial Clarity';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  productName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  soundRating: number;
  comfortRating: number;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'card' | 'applepay';
  status: 'confirmed' | 'processing' | 'shipped';
  estimatedDelivery: string;
}
