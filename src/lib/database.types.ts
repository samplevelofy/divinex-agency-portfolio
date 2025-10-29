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
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      projects: { // Simplified Project Schema
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null // Single image URL
          category_id: string | null
          is_published: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          category_id?: string | null
          is_published?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          category_id?: string | null
          is_published?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Category = Database['public']['Tables']['categories']['Row'];
export type Project = Database['public']['Tables']['projects']['Row']; // Use our simplified Project type

export type ProjectWithCategory = Project & {
  categories: Category | null;
};