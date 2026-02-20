export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          email: string | null;
          role: 'user' | 'admin';
          real_name: string | null;
          school_id: string | null;
          user_type: 'teacher' | 'student' | null;
          profile_completed: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          role?: 'user' | 'admin';
          real_name?: string | null;
          school_id?: string | null;
          user_type?: 'teacher' | 'student' | null;
          profile_completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          role?: 'user' | 'admin';
          real_name?: string | null;
          school_id?: string | null;
          user_type?: 'teacher' | 'student' | null;
          profile_completed?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_school_id_fkey';
            columns: ['school_id'];
            isOneToOne: false;
            referencedRelation: 'schools';
            referencedColumns: ['id'];
          },
        ];
      };
      schools: {
        Row: {
          id: string;
          code: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      qa_posts: {
        Row: {
          id: string;
          author_id: string;
          title: string;
          content: string;
          status: 'open' | 'answered' | 'closed';
          pinned: boolean;
          tags: string[];
          reply_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          title: string;
          content: string;
          status?: 'open' | 'answered' | 'closed';
          pinned?: boolean;
          tags?: string[];
          reply_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string;
          title?: string;
          content?: string;
          status?: 'open' | 'answered' | 'closed';
          pinned?: boolean;
          tags?: string[];
          reply_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qa_posts_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      qa_replies: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          content: string;
          is_official: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          content: string;
          is_official?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string;
          content?: string;
          is_official?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qa_replies_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'qa_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qa_replies_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      rule_versions: {
        Row: {
          id: string;
          title: string;
          version: string;
          changelog: string;
          file_url: string;
          uploaded_by: string;
          published_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          version: string;
          changelog: string;
          file_url: string;
          uploaded_by: string;
          published_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          version?: string;
          changelog?: string;
          file_url?: string;
          uploaded_by?: string;
          published_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'rule_versions_uploaded_by_fkey';
            columns: ['uploaded_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          entity_type: string | null;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'audit_logs_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
