-- ============================================================================
-- Yesanwind Orchestra Database Schema
-- Migration: 20260121000000_initial_schema.sql
-- Description: Initial database schema for Yesanwind Orchestra website
-- ============================================================================

-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 2. CUSTOM TYPES (ENUMS)
-- ============================================================================

-- Concert type enum
CREATE TYPE concert_type AS ENUM ('regular', 'special');

-- Concert status enum
CREATE TYPE concert_status AS ENUM ('upcoming', 'ongoing', 'ended');

-- Member position enum
CREATE TYPE member_position AS ENUM ('conductor', 'principal', 'member');

-- Member part/section enum
CREATE TYPE member_part AS ENUM ('woodwind', 'brass', 'percussion');

-- Post category enum
CREATE TYPE post_category AS ENUM ('notice', 'press');

-- ============================================================================
-- 3. UTILITY FUNCTIONS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 4. TABLES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 4.1 concerts - 공연 정보
-- ----------------------------------------------------------------------------
CREATE TABLE concerts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title varchar(255) NOT NULL,
    description text,
    date date NOT NULL,
    time time NOT NULL,
    venue varchar(255) NOT NULL,
    address varchar(500),
    poster_url text,
    ticket_url text,
    ticket_info varchar(500),
    program text,
    status concert_status NOT NULL DEFAULT 'upcoming',
    concert_type concert_type NOT NULL DEFAULT 'regular',
    is_featured boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE concerts IS '공연 정보 테이블';
COMMENT ON COLUMN concerts.title IS '공연 제목';
COMMENT ON COLUMN concerts.description IS '공연 설명 (HTML 지원)';
COMMENT ON COLUMN concerts.date IS '공연 날짜';
COMMENT ON COLUMN concerts.time IS '공연 시작 시간';
COMMENT ON COLUMN concerts.venue IS '공연장 이름';
COMMENT ON COLUMN concerts.address IS '공연장 주소';
COMMENT ON COLUMN concerts.poster_url IS '포스터 이미지 URL';
COMMENT ON COLUMN concerts.ticket_url IS '외부 예매 링크';
COMMENT ON COLUMN concerts.ticket_info IS '티켓 정보 (가격 등)';
COMMENT ON COLUMN concerts.program IS '연주 프로그램 (HTML 지원)';
COMMENT ON COLUMN concerts.status IS '공연 상태: upcoming, ongoing, ended';
COMMENT ON COLUMN concerts.concert_type IS '공연 유형: regular(정기연주회), special(기획공연)';
COMMENT ON COLUMN concerts.is_featured IS '메인 페이지 노출 여부';

-- ----------------------------------------------------------------------------
-- 4.2 members - 단원 정보
-- ----------------------------------------------------------------------------
CREATE TABLE members (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(100) NOT NULL,
    name_en varchar(100),
    position member_position NOT NULL DEFAULT 'member',
    part member_part,
    instrument varchar(100),
    profile_image text,
    bio text,
    display_order int NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE members IS '단원 정보 테이블';
COMMENT ON COLUMN members.name IS '단원 이름';
COMMENT ON COLUMN members.name_en IS '단원 영문 이름';
COMMENT ON COLUMN members.position IS '직책: conductor(지휘자), principal(수석), member(단원)';
COMMENT ON COLUMN members.part IS '파트: woodwind(목관), brass(금관), percussion(타악)';
COMMENT ON COLUMN members.instrument IS '담당 악기';
COMMENT ON COLUMN members.profile_image IS '프로필 이미지 URL';
COMMENT ON COLUMN members.bio IS '약력 (HTML 지원)';
COMMENT ON COLUMN members.display_order IS '표시 순서';
COMMENT ON COLUMN members.is_active IS '활동 여부';

-- ----------------------------------------------------------------------------
-- 4.3 photo_albums - 사진 앨범
-- ----------------------------------------------------------------------------
CREATE TABLE photo_albums (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title varchar(255) NOT NULL,
    description text,
    cover_image text,
    date date,
    concert_id uuid REFERENCES concerts(id) ON DELETE SET NULL,
    display_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE photo_albums IS '사진 앨범 테이블';
COMMENT ON COLUMN photo_albums.title IS '앨범 제목';
COMMENT ON COLUMN photo_albums.cover_image IS '대표 이미지 URL';
COMMENT ON COLUMN photo_albums.concert_id IS '관련 공연 ID (선택적)';

-- ----------------------------------------------------------------------------
-- 4.4 gallery_photos - 사진 갤러리
-- ----------------------------------------------------------------------------
CREATE TABLE gallery_photos (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id uuid NOT NULL REFERENCES photo_albums(id) ON DELETE CASCADE,
    title varchar(255),
    description text,
    image_url text NOT NULL,
    thumbnail_url text,
    display_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE gallery_photos IS '사진 갤러리 테이블';
COMMENT ON COLUMN gallery_photos.album_id IS '소속 앨범 ID';
COMMENT ON COLUMN gallery_photos.image_url IS '원본 이미지 URL';
COMMENT ON COLUMN gallery_photos.thumbnail_url IS '썸네일 이미지 URL';

-- ----------------------------------------------------------------------------
-- 4.5 gallery_videos - 영상 갤러리
-- ----------------------------------------------------------------------------
CREATE TABLE gallery_videos (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title varchar(255) NOT NULL,
    description text,
    video_url text NOT NULL,
    youtube_id varchar(50),
    thumbnail_url text,
    date date,
    concert_id uuid REFERENCES concerts(id) ON DELETE SET NULL,
    display_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE gallery_videos IS '영상 갤러리 테이블';
COMMENT ON COLUMN gallery_videos.video_url IS 'YouTube 영상 URL';
COMMENT ON COLUMN gallery_videos.youtube_id IS 'YouTube 영상 ID';
COMMENT ON COLUMN gallery_videos.concert_id IS '관련 공연 ID (선택적)';

-- ----------------------------------------------------------------------------
-- 4.6 posts - 게시글 (공지사항, 언론보도)
-- ----------------------------------------------------------------------------
CREATE TABLE posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title varchar(500) NOT NULL,
    content text NOT NULL,
    category post_category NOT NULL DEFAULT 'notice',
    source varchar(255),
    original_url text,
    thumbnail_image text,
    is_pinned boolean NOT NULL DEFAULT false,
    view_count int NOT NULL DEFAULT 0,
    published_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE posts IS '게시글 테이블 (공지사항, 언론보도)';
COMMENT ON COLUMN posts.category IS '카테고리: notice(공지사항), press(언론보도)';
COMMENT ON COLUMN posts.source IS '언론사명 (언론보도용)';
COMMENT ON COLUMN posts.original_url IS '원문 링크 (언론보도용)';
COMMENT ON COLUMN posts.thumbnail_image IS '썸네일 이미지';
COMMENT ON COLUMN posts.is_pinned IS '상단 고정 여부';
COMMENT ON COLUMN posts.view_count IS '조회수';
COMMENT ON COLUMN posts.published_at IS '게시일';

-- ----------------------------------------------------------------------------
-- 4.7 post_attachments - 게시글 첨부파일
-- ----------------------------------------------------------------------------
CREATE TABLE post_attachments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    file_name varchar(255) NOT NULL,
    file_url text NOT NULL,
    file_size int,
    mime_type varchar(100),
    display_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE post_attachments IS '게시글 첨부파일 테이블';

-- ----------------------------------------------------------------------------
-- 4.8 orchestra_info - 오케스트라 정보 (인사말, 연혁 등)
-- ----------------------------------------------------------------------------
CREATE TABLE orchestra_info (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    key varchar(50) NOT NULL UNIQUE,
    title varchar(255),
    content text,
    metadata jsonb DEFAULT '{}',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE orchestra_info IS '오케스트라 정보 테이블';
COMMENT ON COLUMN orchestra_info.key IS '정보 키: greeting, history, organization, location 등';
COMMENT ON COLUMN orchestra_info.metadata IS '추가 메타데이터 (JSON)';

-- ----------------------------------------------------------------------------
-- 4.9 history_items - 연혁 아이템
-- ----------------------------------------------------------------------------
CREATE TABLE history_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    year int NOT NULL,
    month int,
    content text NOT NULL,
    display_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history_items IS '연혁 아이템 테이블';
COMMENT ON COLUMN history_items.year IS '연도';
COMMENT ON COLUMN history_items.month IS '월 (선택적)';
COMMENT ON COLUMN history_items.content IS '연혁 내용';

-- ----------------------------------------------------------------------------
-- 4.10 site_settings - 사이트 설정
-- ----------------------------------------------------------------------------
CREATE TABLE site_settings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    key varchar(100) NOT NULL UNIQUE,
    value text,
    description varchar(255),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE site_settings IS '사이트 설정 테이블';
COMMENT ON COLUMN site_settings.key IS '설정 키';
COMMENT ON COLUMN site_settings.value IS '설정 값';
COMMENT ON COLUMN site_settings.description IS '설정 설명';

-- ============================================================================
-- 5. INDEXES
-- ============================================================================

-- concerts indexes
CREATE INDEX idx_concerts_date ON concerts(date DESC);
CREATE INDEX idx_concerts_status ON concerts(status);
CREATE INDEX idx_concerts_concert_type ON concerts(concert_type);
CREATE INDEX idx_concerts_status_date ON concerts(status, date DESC);
CREATE INDEX idx_concerts_is_featured ON concerts(is_featured) WHERE is_featured = true;

-- members indexes
CREATE INDEX idx_members_position ON members(position);
CREATE INDEX idx_members_part ON members(part);
CREATE INDEX idx_members_is_active ON members(is_active) WHERE is_active = true;
CREATE INDEX idx_members_display_order ON members(display_order);

-- photo_albums indexes
CREATE INDEX idx_photo_albums_date ON photo_albums(date DESC);
CREATE INDEX idx_photo_albums_concert_id ON photo_albums(concert_id);

-- gallery_photos indexes
CREATE INDEX idx_gallery_photos_album_id ON gallery_photos(album_id);
CREATE INDEX idx_gallery_photos_display_order ON gallery_photos(album_id, display_order);

-- gallery_videos indexes
CREATE INDEX idx_gallery_videos_date ON gallery_videos(date DESC);
CREATE INDEX idx_gallery_videos_concert_id ON gallery_videos(concert_id);

-- posts indexes
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_is_pinned ON posts(is_pinned) WHERE is_pinned = true;
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_category_published ON posts(category, published_at DESC);

-- post_attachments indexes
CREATE INDEX idx_post_attachments_post_id ON post_attachments(post_id);

-- history_items indexes
CREATE INDEX idx_history_items_year ON history_items(year DESC, month DESC NULLS LAST);

-- ============================================================================
-- 6. TRIGGERS
-- ============================================================================

-- Auto-update updated_at triggers
CREATE TRIGGER update_concerts_updated_at
    BEFORE UPDATE ON concerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_photo_albums_updated_at
    BEFORE UPDATE ON photo_albums
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_videos_updated_at
    BEFORE UPDATE ON gallery_videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orchestra_info_updated_at
    BEFORE UPDATE ON orchestra_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_history_items_updated_at
    BEFORE UPDATE ON history_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE concerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE orchestra_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 7.1 Public Read Policies (Anonymous users can read)
-- ----------------------------------------------------------------------------

-- concerts: public read
CREATE POLICY "concerts_public_read"
    ON concerts FOR SELECT
    TO anon, authenticated
    USING (true);

-- members: public read (only active members)
CREATE POLICY "members_public_read"
    ON members FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- photo_albums: public read
CREATE POLICY "photo_albums_public_read"
    ON photo_albums FOR SELECT
    TO anon, authenticated
    USING (true);

-- gallery_photos: public read
CREATE POLICY "gallery_photos_public_read"
    ON gallery_photos FOR SELECT
    TO anon, authenticated
    USING (true);

-- gallery_videos: public read
CREATE POLICY "gallery_videos_public_read"
    ON gallery_videos FOR SELECT
    TO anon, authenticated
    USING (true);

-- posts: public read
CREATE POLICY "posts_public_read"
    ON posts FOR SELECT
    TO anon, authenticated
    USING (true);

-- post_attachments: public read
CREATE POLICY "post_attachments_public_read"
    ON post_attachments FOR SELECT
    TO anon, authenticated
    USING (true);

-- orchestra_info: public read
CREATE POLICY "orchestra_info_public_read"
    ON orchestra_info FOR SELECT
    TO anon, authenticated
    USING (true);

-- history_items: public read
CREATE POLICY "history_items_public_read"
    ON history_items FOR SELECT
    TO anon, authenticated
    USING (true);

-- site_settings: public read
CREATE POLICY "site_settings_public_read"
    ON site_settings FOR SELECT
    TO anon, authenticated
    USING (true);

-- ----------------------------------------------------------------------------
-- 7.2 Admin Write Policies (Only authenticated admin users can write)
-- Note: In production, add proper admin role check using auth.jwt() claims
-- For now, all authenticated users with service_role can write
-- ----------------------------------------------------------------------------

-- concerts: admin full access
CREATE POLICY "concerts_admin_all"
    ON concerts FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- members: admin full access
CREATE POLICY "members_admin_all"
    ON members FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- photo_albums: admin full access
CREATE POLICY "photo_albums_admin_all"
    ON photo_albums FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- gallery_photos: admin full access
CREATE POLICY "gallery_photos_admin_all"
    ON gallery_photos FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- gallery_videos: admin full access
CREATE POLICY "gallery_videos_admin_all"
    ON gallery_videos FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- posts: admin full access
CREATE POLICY "posts_admin_all"
    ON posts FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- post_attachments: admin full access
CREATE POLICY "post_attachments_admin_all"
    ON post_attachments FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- orchestra_info: admin full access
CREATE POLICY "orchestra_info_admin_all"
    ON orchestra_info FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- history_items: admin full access
CREATE POLICY "history_items_admin_all"
    ON history_items FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- site_settings: admin full access
CREATE POLICY "site_settings_admin_all"
    ON site_settings FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin');

-- ----------------------------------------------------------------------------
-- 7.3 Service Role Full Access (for server-side operations)
-- ----------------------------------------------------------------------------

CREATE POLICY "concerts_service_role_all"
    ON concerts FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "members_service_role_all"
    ON members FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "photo_albums_service_role_all"
    ON photo_albums FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "gallery_photos_service_role_all"
    ON gallery_photos FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "gallery_videos_service_role_all"
    ON gallery_videos FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "posts_service_role_all"
    ON posts FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "post_attachments_service_role_all"
    ON post_attachments FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "orchestra_info_service_role_all"
    ON orchestra_info FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "history_items_service_role_all"
    ON history_items FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "site_settings_service_role_all"
    ON site_settings FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- 8. INITIAL DATA
-- ============================================================================

-- Insert default orchestra info keys
INSERT INTO orchestra_info (key, title, content) VALUES
    ('greeting', '인사말', NULL),
    ('organization', '조직도', NULL),
    ('location', '오시는 길', NULL);

-- Insert default site settings
INSERT INTO site_settings (key, value, description) VALUES
    ('site_name', '예산윈드오케스트라', '사이트 이름'),
    ('site_description', '충청남도 예산군 관악 오케스트라', '사이트 설명'),
    ('contact_email', NULL, '대표 이메일'),
    ('contact_phone', NULL, '대표 전화번호'),
    ('contact_address', NULL, '주소'),
    ('sns_youtube', NULL, 'YouTube 채널 URL'),
    ('sns_instagram', NULL, 'Instagram 계정 URL'),
    ('sns_facebook', NULL, 'Facebook 페이지 URL'),
    ('sns_blog', NULL, '블로그 URL');

-- ============================================================================
-- 9. HELPER FUNCTIONS
-- ============================================================================

-- Function to increment post view count
CREATE OR REPLACE FUNCTION increment_post_view_count(post_id uuid)
RETURNS void AS $$
BEGIN
    UPDATE posts
    SET view_count = view_count + 1
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION increment_post_view_count(uuid) TO anon, authenticated;

-- Function to get photo count for an album
CREATE OR REPLACE FUNCTION get_album_photo_count(album_id uuid)
RETURNS int AS $$
    SELECT COUNT(*)::int FROM gallery_photos WHERE gallery_photos.album_id = $1;
$$ LANGUAGE sql STABLE;
