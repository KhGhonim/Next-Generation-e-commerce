export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  brand: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  tags: string[];
}

export interface SalesTeamMember {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  salesTarget?: number;
  department?: string;
}

export interface Payment {
  _id?: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  transactionId?: string;
  customerEmail?: string;
  createdAt?: string;
}

export interface Category {
  _id?: string;
  name: string;
  description?: string;
  slug: string;
  image?: string;
  isActive: boolean;
}

export interface DashboardUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  lastLogin?: string;
  createdAt?: string;
}
