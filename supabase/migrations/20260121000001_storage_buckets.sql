-- ============================================================================
-- Yesanwind Orchestra Storage Buckets
-- Migration: 20260121000001_storage_buckets.sql
-- Description: Create storage buckets for file uploads
-- ============================================================================

-- ============================================================================
-- 1. CREATE STORAGE BUCKETS
-- ============================================================================

-- Create bucket for concert posters
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'concert-posters',
    'concert-posters',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create bucket for member profile images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'member-profiles',
    'member-profiles',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Create bucket for gallery photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'gallery-photos',
    'gallery-photos',
    true,
    10485760, -- 10MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create bucket for post attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'post-attachments',
    'post-attachments',
    true,
    20971520, -- 20MB
    ARRAY[
        'image/jpeg', 'image/png', 'image/webp', 'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/zip',
        'text/plain'
    ]
) ON CONFLICT (id) DO NOTHING;

-- Create bucket for general site assets (hero images, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'site-assets',
    'site-assets',
    true,
    10485760, -- 10MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. STORAGE POLICIES - Public Read
-- ============================================================================

-- concert-posters: public read
CREATE POLICY "concert_posters_public_read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'concert-posters');

-- member-profiles: public read
CREATE POLICY "member_profiles_public_read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'member-profiles');

-- gallery-photos: public read
CREATE POLICY "gallery_photos_public_read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'gallery-photos');

-- post-attachments: public read
CREATE POLICY "post_attachments_public_read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'post-attachments');

-- site-assets: public read
CREATE POLICY "site_assets_public_read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'site-assets');

-- ============================================================================
-- 3. STORAGE POLICIES - Admin Write (Insert, Update, Delete)
-- ============================================================================

-- concert-posters: admin write
CREATE POLICY "concert_posters_admin_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'concert-posters' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "concert_posters_admin_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'concert-posters' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "concert_posters_admin_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'concert-posters' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

-- member-profiles: admin write
CREATE POLICY "member_profiles_admin_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'member-profiles' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "member_profiles_admin_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'member-profiles' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "member_profiles_admin_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'member-profiles' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

-- gallery-photos: admin write
CREATE POLICY "gallery_photos_storage_admin_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'gallery-photos' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "gallery_photos_storage_admin_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'gallery-photos' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "gallery_photos_storage_admin_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'gallery-photos' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

-- post-attachments: admin write
CREATE POLICY "post_attachments_storage_admin_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'post-attachments' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "post_attachments_storage_admin_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'post-attachments' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "post_attachments_storage_admin_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'post-attachments' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

-- site-assets: admin write
CREATE POLICY "site_assets_admin_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'site-assets' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "site_assets_admin_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'site-assets' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

CREATE POLICY "site_assets_admin_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'site-assets' AND
    (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'user_role' = 'admin')
);

-- ============================================================================
-- 4. STORAGE POLICIES - Service Role Full Access
-- ============================================================================

CREATE POLICY "storage_service_role_all"
ON storage.objects FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
