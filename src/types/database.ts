/**
 * Supabase Database Types
 *
 * 이 파일은 Supabase 데이터베이스 스키마와 동기화되어야 합니다.
 * 스키마 변경 시 아래 명령으로 자동 생성할 수 있습니다:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ============================================================================
// Enum Types
// ============================================================================

export type ConcertType = 'regular' | 'special';
export type ConcertStatus = 'upcoming' | 'ongoing' | 'ended';
export type MemberPosition = 'conductor' | 'principal' | 'member';
export type MemberPart = 'woodwind' | 'brass' | 'percussion';
export type PostCategory = 'notice' | 'press';

// ============================================================================
// Database Interface
// ============================================================================

export interface Database {
  public: {
    Tables: {
      // ------------------------------------------------------------------
      // concerts - 공연 정보
      // ------------------------------------------------------------------
      concerts: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          date: string;
          time: string;
          venue: string;
          address: string | null;
          poster_url: string | null;
          ticket_url: string | null;
          ticket_info: string | null;
          program: string | null;
          status: ConcertStatus;
          concert_type: ConcertType;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          date: string;
          time: string;
          venue: string;
          address?: string | null;
          poster_url?: string | null;
          ticket_url?: string | null;
          ticket_info?: string | null;
          program?: string | null;
          status?: ConcertStatus;
          concert_type?: ConcertType;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          date?: string;
          time?: string;
          venue?: string;
          address?: string | null;
          poster_url?: string | null;
          ticket_url?: string | null;
          ticket_info?: string | null;
          program?: string | null;
          status?: ConcertStatus;
          concert_type?: ConcertType;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      // ------------------------------------------------------------------
      // members - 단원 정보
      // ------------------------------------------------------------------
      members: {
        Row: {
          id: string;
          name: string;
          name_en: string | null;
          position: MemberPosition;
          part: MemberPart | null;
          instrument: string | null;
          profile_image: string | null;
          bio: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_en?: string | null;
          position?: MemberPosition;
          part?: MemberPart | null;
          instrument?: string | null;
          profile_image?: string | null;
          bio?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_en?: string | null;
          position?: MemberPosition;
          part?: MemberPart | null;
          instrument?: string | null;
          profile_image?: string | null;
          bio?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      // ------------------------------------------------------------------
      // photo_albums - 사진 앨범
      // ------------------------------------------------------------------
      photo_albums: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          cover_image: string | null;
          date: string | null;
          concert_id: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          cover_image?: string | null;
          date?: string | null;
          concert_id?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          cover_image?: string | null;
          date?: string | null;
          concert_id?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'photo_albums_concert_id_fkey';
            columns: ['concert_id'];
            referencedRelation: 'concerts';
            referencedColumns: ['id'];
          }
        ];
      };

      // ------------------------------------------------------------------
      // gallery_photos - 사진 갤러리
      // ------------------------------------------------------------------
      gallery_photos: {
        Row: {
          id: string;
          album_id: string;
          title: string | null;
          description: string | null;
          image_url: string;
          thumbnail_url: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          album_id: string;
          title?: string | null;
          description?: string | null;
          image_url: string;
          thumbnail_url?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          album_id?: string;
          title?: string | null;
          description?: string | null;
          image_url?: string;
          thumbnail_url?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'gallery_photos_album_id_fkey';
            columns: ['album_id'];
            referencedRelation: 'photo_albums';
            referencedColumns: ['id'];
          }
        ];
      };

      // ------------------------------------------------------------------
      // gallery_videos - 영상 갤러리
      // ------------------------------------------------------------------
      gallery_videos: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          video_url: string;
          youtube_id: string | null;
          thumbnail_url: string | null;
          date: string | null;
          concert_id: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          video_url: string;
          youtube_id?: string | null;
          thumbnail_url?: string | null;
          date?: string | null;
          concert_id?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          video_url?: string;
          youtube_id?: string | null;
          thumbnail_url?: string | null;
          date?: string | null;
          concert_id?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'gallery_videos_concert_id_fkey';
            columns: ['concert_id'];
            referencedRelation: 'concerts';
            referencedColumns: ['id'];
          }
        ];
      };

      // ------------------------------------------------------------------
      // posts - 게시글 (공지사항, 언론보도)
      // ------------------------------------------------------------------
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: PostCategory;
          source: string | null;
          original_url: string | null;
          thumbnail_image: string | null;
          is_pinned: boolean;
          view_count: number;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          category?: PostCategory;
          source?: string | null;
          original_url?: string | null;
          thumbnail_image?: string | null;
          is_pinned?: boolean;
          view_count?: number;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          category?: PostCategory;
          source?: string | null;
          original_url?: string | null;
          thumbnail_image?: string | null;
          is_pinned?: boolean;
          view_count?: number;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      // ------------------------------------------------------------------
      // post_attachments - 게시글 첨부파일
      // ------------------------------------------------------------------
      post_attachments: {
        Row: {
          id: string;
          post_id: string;
          file_name: string;
          file_url: string;
          file_size: number | null;
          mime_type: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          file_name: string;
          file_url: string;
          file_size?: number | null;
          mime_type?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          file_name?: string;
          file_url?: string;
          file_size?: number | null;
          mime_type?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'post_attachments_post_id_fkey';
            columns: ['post_id'];
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          }
        ];
      };

      // ------------------------------------------------------------------
      // orchestra_info - 오케스트라 정보
      // ------------------------------------------------------------------
      orchestra_info: {
        Row: {
          id: string;
          key: string;
          title: string | null;
          content: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          title?: string | null;
          content?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          title?: string | null;
          content?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      // ------------------------------------------------------------------
      // history_items - 연혁 아이템
      // ------------------------------------------------------------------
      history_items: {
        Row: {
          id: string;
          year: number;
          month: number | null;
          content: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          year: number;
          month?: number | null;
          content: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          year?: number;
          month?: number | null;
          content?: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      // ------------------------------------------------------------------
      // site_settings - 사이트 설정
      // ------------------------------------------------------------------
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      increment_post_view_count: {
        Args: {
          post_id: string;
        };
        Returns: undefined;
      };
      get_album_photo_count: {
        Args: {
          album_id: string;
        };
        Returns: number;
      };
    };

    Enums: {
      concert_type: ConcertType;
      concert_status: ConcertStatus;
      member_position: MemberPosition;
      member_part: MemberPart;
      post_category: PostCategory;
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// ============================================================================
// Convenience Type Aliases
// ============================================================================

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

// ============================================================================
// Table Row Types (for easy import)
// ============================================================================

export type Concert = Tables<'concerts'>;
export type ConcertInsert = InsertTables<'concerts'>;
export type ConcertUpdate = UpdateTables<'concerts'>;

export type Member = Tables<'members'>;
export type MemberInsert = InsertTables<'members'>;
export type MemberUpdate = UpdateTables<'members'>;

export type PhotoAlbum = Tables<'photo_albums'>;
export type PhotoAlbumInsert = InsertTables<'photo_albums'>;
export type PhotoAlbumUpdate = UpdateTables<'photo_albums'>;

export type GalleryPhoto = Tables<'gallery_photos'>;
export type GalleryPhotoInsert = InsertTables<'gallery_photos'>;
export type GalleryPhotoUpdate = UpdateTables<'gallery_photos'>;

export type GalleryVideo = Tables<'gallery_videos'>;
export type GalleryVideoInsert = InsertTables<'gallery_videos'>;
export type GalleryVideoUpdate = UpdateTables<'gallery_videos'>;

export type Post = Tables<'posts'>;
export type PostInsert = InsertTables<'posts'>;
export type PostUpdate = UpdateTables<'posts'>;

export type PostAttachment = Tables<'post_attachments'>;
export type PostAttachmentInsert = InsertTables<'post_attachments'>;
export type PostAttachmentUpdate = UpdateTables<'post_attachments'>;

export type OrchestraInfo = Tables<'orchestra_info'>;
export type OrchestraInfoInsert = InsertTables<'orchestra_info'>;
export type OrchestraInfoUpdate = UpdateTables<'orchestra_info'>;

export type HistoryItem = Tables<'history_items'>;
export type HistoryItemInsert = InsertTables<'history_items'>;
export type HistoryItemUpdate = UpdateTables<'history_items'>;

export type SiteSetting = Tables<'site_settings'>;
export type SiteSettingInsert = InsertTables<'site_settings'>;
export type SiteSettingUpdate = UpdateTables<'site_settings'>;

// ============================================================================
// Extended Types (with relations)
// ============================================================================

export interface PhotoAlbumWithPhotos extends PhotoAlbum {
  photos: GalleryPhoto[];
  photo_count?: number;
}

export interface PostWithAttachments extends Post {
  attachments: PostAttachment[];
}

export interface GalleryVideoWithConcert extends GalleryVideo {
  concert?: Concert | null;
}

export interface PhotoAlbumWithConcert extends PhotoAlbum {
  concert?: Concert | null;
}
