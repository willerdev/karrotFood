export interface MenuItem {
  id?: string;
  menu_item_id?: string;
  name?: string;
  product_name?: string;
  price: number | string;
  image?: string;
  img_url?: string;
  restaurantId?: string;
  restaurant_id?: string;
}

export interface CartItem {
  id: string;
  menuItem: {
    id: string;
    restaurantId: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  customizations?: Record<string, string>;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity: number, customizations?: Record<string, string>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
} 