export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      agencies: {
        Row: {
          activity_ar: string | null
          activity_fr: string | null
          address: string | null
          address_ar: string | null
          city: string | null
          clients_generated: number
          cover_url: string | null
          coverage_cities: string[]
          created_at: string
          description_ar: string | null
          description_fr: string | null
          email: string | null
          id: string
          is_partner: boolean
          is_verified: boolean
          logo_url: string | null
          name: string
          name_ar: string | null
          offerings_ar: string[]
          offerings_fr: string[]
          phone: string | null
          published: boolean
          services: string[]
          show_stats: boolean
          slug: string
          sort_order: number
          summary_ar: string | null
          summary_fr: string | null
          trade_name: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          activity_ar?: string | null
          activity_fr?: string | null
          address?: string | null
          address_ar?: string | null
          city?: string | null
          clients_generated?: number
          cover_url?: string | null
          coverage_cities?: string[]
          created_at?: string
          description_ar?: string | null
          description_fr?: string | null
          email?: string | null
          id?: string
          is_partner?: boolean
          is_verified?: boolean
          logo_url?: string | null
          name: string
          name_ar?: string | null
          offerings_ar?: string[]
          offerings_fr?: string[]
          phone?: string | null
          published?: boolean
          services?: string[]
          show_stats?: boolean
          slug: string
          sort_order?: number
          summary_ar?: string | null
          summary_fr?: string | null
          trade_name?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          activity_ar?: string | null
          activity_fr?: string | null
          address?: string | null
          address_ar?: string | null
          city?: string | null
          clients_generated?: number
          cover_url?: string | null
          coverage_cities?: string[]
          created_at?: string
          description_ar?: string | null
          description_fr?: string | null
          email?: string | null
          id?: string
          is_partner?: boolean
          is_verified?: boolean
          logo_url?: string | null
          name?: string
          name_ar?: string | null
          offerings_ar?: string[]
          offerings_fr?: string[]
          phone?: string | null
          published?: boolean
          services?: string[]
          show_stats?: boolean
          slug?: string
          sort_order?: number
          summary_ar?: string | null
          summary_fr?: string | null
          trade_name?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      agency_contact_events: {
        Row: {
          agency_slug: string
          channel: string
          created_at: string
          id: string
          visitor_id: string
        }
        Insert: {
          agency_slug: string
          channel: string
          created_at?: string
          id?: string
          visitor_id: string
        }
        Update: {
          agency_slug?: string
          channel?: string
          created_at?: string
          id?: string
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_contact_events_agency_slug_fkey"
            columns: ["agency_slug"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["slug"]
          },
        ]
      }
      agency_offering_links: {
        Row: {
          agency_slug: string
          offering_slug: string
        }
        Insert: {
          agency_slug: string
          offering_slug: string
        }
        Update: {
          agency_slug?: string
          offering_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_offering_links_agency_slug_fkey"
            columns: ["agency_slug"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "agency_offering_links_offering_slug_fkey"
            columns: ["offering_slug"]
            isOneToOne: false
            referencedRelation: "agency_offerings"
            referencedColumns: ["slug"]
          },
        ]
      }
      agency_offerings: {
        Row: {
          audience: string
          category: string
          label_ar: string
          label_fr: string
          slug: string
        }
        Insert: {
          audience?: string
          category: string
          label_ar: string
          label_fr: string
          slug: string
        }
        Update: {
          audience?: string
          category?: string
          label_ar?: string
          label_fr?: string
          slug?: string
        }
        Relationships: []
      }
      agency_opportunities: {
        Row: {
          city: string
          created_at: string
          email: string
          full_name: string
          id: string
          need_details: string
          offering_slug: string
          phone: string
          qualification_notes: string
          source_agency: string | null
          status: string
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          need_details: string
          offering_slug: string
          phone: string
          qualification_notes?: string
          source_agency?: string | null
          status?: string
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          need_details?: string
          offering_slug?: string
          phone?: string
          qualification_notes?: string
          source_agency?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_opportunities_offering_slug_fkey"
            columns: ["offering_slug"]
            isOneToOne: false
            referencedRelation: "agency_offerings"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "agency_opportunities_source_agency_fkey"
            columns: ["source_agency"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["slug"]
          },
        ]
      }
      agency_opportunity_recipients: {
        Row: {
          agency_slug: string
          delivered_at: string | null
          opportunity_id: string
          selected_at: string
        }
        Insert: {
          agency_slug: string
          delivered_at?: string | null
          opportunity_id: string
          selected_at?: string
        }
        Update: {
          agency_slug?: string
          delivered_at?: string | null
          opportunity_id?: string
          selected_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_opportunity_recipients_agency_slug_fkey"
            columns: ["agency_slug"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "agency_opportunity_recipients_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "agency_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      preregistrations: {
        Row: {
          category: string
          city: string
          company_name: string | null
          created_at: string
          email: string
          full_name: string
          health_entity_type: string | null
          id: string
          need_details: string | null
          phone: string
          profile: string
          real_estate_intent: string | null
          team_size: string | null
        }
        Insert: {
          category: string
          city: string
          company_name?: string | null
          created_at?: string
          email: string
          full_name: string
          health_entity_type?: string | null
          id?: string
          need_details?: string | null
          phone: string
          profile?: string
          real_estate_intent?: string | null
          team_size?: string | null
        }
        Update: {
          category?: string
          city?: string
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          health_entity_type?: string | null
          id?: string
          need_details?: string | null
          phone?: string
          profile?: string
          real_estate_intent?: string | null
          team_size?: string | null
        }
        Relationships: []
      }
      pro_funnel_events: {
        Row: {
          category: string | null
          city: string | null
          created_at: string
          event: string
          hero_variant: string | null
          id: string
          session_id: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          category?: string | null
          city?: string | null
          created_at?: string
          event: string
          hero_variant?: string | null
          id?: string
          session_id: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          category?: string | null
          city?: string | null
          created_at?: string
          event?: string
          hero_variant?: string | null
          id?: string
          session_id?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          role: string
          user_id: string
        }
        Update: {
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      agency_contact_counts: {
        Args: never
        Returns: {
          agency_slug: string
          contacts: number
        }[]
      }
      is_directory_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
