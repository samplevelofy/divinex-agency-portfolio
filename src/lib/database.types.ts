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
      projects: {
        Row: {
          id: string
          title: string
          description: string
          category_id: string | null
          images: Json
          thumbnail: string
          is_published: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          category_id?: string | null
          images?: Json
          thumbnail?: string
          is_published?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category_id?: string | null
          images?: Json
          thumbnail?: string
          is_published?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          project_type: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          project_type?: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          project_type?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}

export type Category = Database['public']['Tables']['categories']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];

export type ProjectWithCategory = Project & {
  categories: Category | null;
};