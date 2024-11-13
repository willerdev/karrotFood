import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface OrderItem {
  id: string;
  menu_item_id: string;
  quantity: number;
  unit_price: number;
  customizations: Record<string, any> | null;
  menu_item: {
    name: string;
  };
}

interface Order {
  id: string;
  restaurant: {
    name: string;
  };
  status: string;
  created_at: string;
  total_amount: number;
  order_items: OrderItem[];
}

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: (deliveryDetails: any, items: any[], total: number) => Promise<string>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  isLoading: false,
  error: null,
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          id,
          status,
          created_at,
          total_amount,
          restaurant:restaurants(name),
          order_items(
            id,
            quantity,
            unit_price,
            customizations,
            menu_item:menu_items(name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ orders: orders || [], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  createOrder: async (deliveryDetails, items, total) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      if (!items[0]?.menuItem?.restaurantId) {
        throw new Error('Restaurant ID is missing from order items');
      }

      // First create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            delivery_address: deliveryDetails.address,
            total_amount: total,
            status: 'pending',
            restaurant_id: items[0].menuItem.restaurantId,
            delivery_details: deliveryDetails
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Then create order items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(
          items.map(item => ({
            order_id: order.id,
            menu_item_id: item.menuItem.id,
            quantity: item.quantity,
            unit_price: item.menuItem.price,
            customizations: item.customizations || null
          }))
        );

      if (itemsError) throw itemsError;

      // Refresh orders list
      const { fetchOrders } = useOrderStore.getState();
      await fetchOrders();

      return order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
}));
