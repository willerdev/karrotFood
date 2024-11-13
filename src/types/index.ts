export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  image_url?: string;
  cuisine_type?: string;
  rating?: number;
  delivery_time?: string;
  delivery_fee?: number;
  is_featured?: boolean;
  created_at?: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  customization?: {
    options: {
      name: string;
      choices: { label: string; price: number }[];
    }[];
  };
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations?: Record<string, string>;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity: number, customizations?: Record<string, string>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}