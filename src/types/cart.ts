export interface CartItem {
  menuItem: {
    id: string;
    restaurantId: string;
    price: number;
  };
  quantity: number;
  customizations?: Record<string, any>;
}
