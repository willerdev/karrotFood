import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Restaurant = Database['public']['Tables']['restaurants']['Row'];

interface RestaurantState {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
  fetchRestaurants: () => Promise<void>;
  fetchRestaurantsByCategory: (categoryId: string) => Promise<void>;
  getRestaurantById: (id: string) => Restaurant | undefined;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  restaurants: [],
  isLoading: false,
  error: null,
  fetchRestaurants: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ restaurants: data || [], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  fetchRestaurantsByCategory: async (categoryId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ restaurants: data || [], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  getRestaurantById: (id: string) => {
    return get().restaurants.find(restaurant => restaurant.id === id);
  },
}));