export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  rating: number;
  stock: number;
  badge: string | null;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration_mins: number;
  image_url: string;
  category: string;
  created_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  billing_cycle: string;
  features: string[];
  image_url: string;
  popular: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  read_mins: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  pet_name: string;
  pet_type: string;
  rating: number;
  content: string;
  service_name: string | null;
  image_url: string;
  created_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  image_url: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  service_id: string | null;
  customer_name: string;
  email: string;
  pet_name: string;
  pet_type: string;
  booking_date: string;
  time_slot: string;
  notes: string | null;
  status: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
