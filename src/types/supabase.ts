export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          icon: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          image_url?: string
          created_at?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string
          cuisine: string
          rating: number
          delivery_time: string
          delivery_fee: number
          featured: boolean
          created_at: string
          category_id: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image_url: string
          cuisine: string
          rating: number
          delivery_time: string
          delivery_fee: number
          featured?: boolean
          created_at?: string
          category_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image_url?: string
          cuisine?: string
          rating?: number
          delivery_time?: string
          delivery_fee?: number
          featured?: boolean
          created_at?: string
          category_id?: string
        }
      }
    }
  }
}