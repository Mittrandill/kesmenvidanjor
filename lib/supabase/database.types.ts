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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string
          id: number
          name: string
          type: Database["public"]["Enums"]["account_type"]
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
          type: Database["public"]["Enums"]["account_type"]
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
          type?: Database["public"]["Enums"]["account_type"]
        }
        Relationships: []
      }
      appointments: {
        Row: {
          completed_at: string | null
          created_at: string
          customer_id: number
          id: number
          notes: string | null
          region: string | null
          scheduled_at: string
          service_slug: string
          status: Database["public"]["Enums"]["appointment_status"]
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          customer_id: number
          id?: never
          notes?: string | null
          region?: string | null
          scheduled_at: string
          service_slug: string
          status?: Database["public"]["Enums"]["appointment_status"]
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          customer_id?: number
          id?: never
          notes?: string | null
          region?: string | null
          scheduled_at?: string
          service_slug?: string
          status?: Database["public"]["Enums"]["appointment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          created_at: string
          id: number
          name: string
          notes: string | null
          phone: string | null
          region: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: never
          name: string
          notes?: string | null
          phone?: string | null
          region?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: never
          name?: string
          notes?: string | null
          phone?: string | null
          region?: string | null
        }
        Relationships: []
      }
      ledger_entries: {
        Row: {
          account_id: number | null
          amount: number
          created_at: string
          customer_id: number
          description: string | null
          entry_type: Database["public"]["Enums"]["ledger_entry_type"]
          id: number
          invoice_number: string | null
          invoice_required: boolean
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          related_appointment_id: number | null
        }
        Insert: {
          account_id?: number | null
          amount: number
          created_at?: string
          customer_id: number
          description?: string | null
          entry_type: Database["public"]["Enums"]["ledger_entry_type"]
          id?: never
          invoice_number?: string | null
          invoice_required?: boolean
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          related_appointment_id?: number | null
        }
        Update: {
          account_id?: number | null
          amount?: number
          created_at?: string
          customer_id?: number
          description?: string | null
          entry_type?: Database["public"]["Enums"]["ledger_entry_type"]
          id?: never
          invoice_number?: string | null
          invoice_required?: boolean
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          related_appointment_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "account_balances"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "ledger_entries_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_balances"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "ledger_entries_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_entries_related_appointment_id_fkey"
            columns: ["related_appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      account_balances: {
        Row: {
          account_id: number | null
          balance: number | null
        }
        Relationships: []
      }
      customer_balances: {
        Row: {
          balance: number | null
          customer_id: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      complete_appointment: {
        Args: {
          p_amount: number
          p_appointment_id: number
          p_description?: string
          p_invoice_required?: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      account_type: "kasa" | "banka"
      appointment_status: "planlandi" | "tamamlandi" | "iptal"
      ledger_entry_type: "borc" | "tahsilat" | "iade"
      payment_method: "nakit" | "pos" | "havale"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["kasa", "banka"],
      appointment_status: ["planlandi", "tamamlandi", "iptal"],
      ledger_entry_type: ["borc", "tahsilat", "iade"],
      payment_method: ["nakit", "pos", "havale"],
    },
  },
} as const
