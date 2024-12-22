export interface Database {
  public: {
    Tables: {
      characters: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'unicorn' | 'mermaid';
          created_at: string;
          last_played: string;
          progress: number;
        };
        Insert: {
          id?: string;
          user_id?: string;
          name: string;
          type?: 'unicorn' | 'mermaid';
          created_at?: string;
          last_played?: string;
          progress?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: 'unicorn' | 'mermaid';
          created_at?: string;
          last_played?: string;
          progress?: number;
        };
      };
    };
  };
}