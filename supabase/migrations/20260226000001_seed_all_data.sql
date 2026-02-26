-- ============================================================================
-- Seed Data Migration: Members, Concerts, Photo Albums, Gallery Photos, Videos
-- Migration: 20260226000001_seed_all_data.sql
-- Description: Insert all mock data into the database tables
-- ============================================================================

-- ============================================================================
-- 1. MEMBERS
-- ============================================================================

-- Conductor
INSERT INTO members (name, name_en, position, part, instrument, profile_image, bio, display_order, is_active) VALUES
(
    '김태혁',
    'Kim Yesan',
    'conductor',
    NULL,
    '지휘',
    '/images/members/conductor.jpg',
    E'예산윈드오케스트라의 음악적 여정을 이끌어가는 김태혁 상임지휘자입니다.\n\n클래식 음악의 깊이와 대중 음악의 친근함을 조화롭게 엮어, 지역 주민들에게 수준 높은 문화 공연을 선사하고자 합니다.\n\n27년간 오케스트라와 함께하며, 음악을 통해 지역 사회와 소통하고 문화 발전에 기여하는 것을 소명으로 삼고 있습니다.',
    1,
    true
);

-- Woodwind members
INSERT INTO members (name, position, part, instrument, profile_image, display_order, is_active) VALUES
-- 플루트
('이서연', 'principal', 'woodwind', '플루트',   '/images/members/flute-1.jpg', 1,  true),
('박지현', 'member',    'woodwind', '플루트',   NULL, 2,  true),
('최유진', 'member',    'woodwind', '플루트',   NULL, 3,  true),
('정민서', 'member',    'woodwind', '피콜로',   NULL, 4,  true),
-- 오보에
('김하은', 'principal', 'woodwind', '오보에',   NULL, 5,  true),
('이수빈', 'member',    'woodwind', '오보에',   NULL, 6,  true),
('박서현', 'member',    'woodwind', '잉글리시 호른', NULL, 7,  true),
-- 클라리넷
('정예진', 'principal', 'woodwind', '클라리넷', NULL, 8,  true),
('최민지', 'member',    'woodwind', '클라리넷', NULL, 9,  true),
('김지은', 'member',    'woodwind', '클라리넷', NULL, 10, true),
('이서윤', 'member',    'woodwind', '베이스 클라리넷', NULL, 11, true),
-- 바순
('박준영', 'principal', 'woodwind', '바순',     NULL, 12, true),
('김태현', 'member',    'woodwind', '바순',     NULL, 13, true),
-- 색소폰
('이민재', 'principal', 'woodwind', '알토 색소폰',   NULL, 14, true),
('정현우', 'member',    'woodwind', '테너 색소폰',   NULL, 15, true),
('최재훈', 'member',    'woodwind', '바리톤 색소폰', NULL, 16, true);

-- Brass members
INSERT INTO members (name, position, part, instrument, display_order, is_active) VALUES
-- 호른
('김도현', 'principal', 'brass', '호른',     1,  true),
('이승우', 'member',    'brass', '호른',     2,  true),
('박성민', 'member',    'brass', '호른',     3,  true),
('정재원', 'member',    'brass', '호른',     4,  true),
-- 트럼펫
('최동현', 'principal', 'brass', '트럼펫',   5,  true),
('김준서', 'member',    'brass', '트럼펫',   6,  true),
('이현준', 'member',    'brass', '트럼펫',   7,  true),
('박지훈', 'member',    'brass', '트럼펫',   8,  true),
-- 트롬본
('정우진', 'principal', 'brass', '트롬본',   9,  true),
('최성훈', 'member',    'brass', '트롬본',   10, true),
('김민준', 'member',    'brass', '베이스 트롬본', 11, true),
-- 유포니움
('이태현', 'principal', 'brass', '유포니움', 12, true),
('박준호', 'member',    'brass', '유포니움', 13, true),
-- 튜바
('정석현', 'principal', 'brass', '튜바',     14, true),
('최민수', 'member',    'brass', '튜바',     15, true);

-- Percussion members
INSERT INTO members (name, position, part, instrument, display_order, is_active) VALUES
('김현서', 'principal', 'percussion', '팀파니',       1, true),
('이승현', 'member',    'percussion', '스네어 드럼',  2, true),
('박지성', 'member',    'percussion', '베이스 드럼',  3, true),
('정민혁', 'member',    'percussion', '심벌즈',       4, true),
('최영준', 'member',    'percussion', '마림바',       5, true),
('김승우', 'member',    'percussion', '실로폰',       6, true),
('이준혁', 'member',    'percussion', '글로켄슈필',   7, true),
('박현우', 'member',    'percussion', '종합 타악기',  8, true);

-- ============================================================================
-- 2. CONCERTS
-- ============================================================================

INSERT INTO concerts (title, description, date, time, venue, address, poster_url, ticket_url, ticket_info, program, status, concert_type, is_featured) VALUES
-- Concert 1: 제47회 정기연주회
(
    '제47회 정기연주회 - 봄의 선율',
    '예산윈드오케스트라의 47번째 정기연주회입니다. 봄의 설렘과 희망을 담은 다채로운 프로그램으로 관객 여러분을 찾아갑니다.',
    '2025-03-15',
    '19:30',
    '예산문화예술회관 대공연장',
    '충남 예산군 예산읍 군청로 1',
    '/images/concerts/poster-47th.jpg',
    'https://ticket.example.com/47th',
    '전석 무료 (사전 예약 필수)',
    '[{"order":1,"title":"Festive Overture, Op. 96","composer":"Dmitri Shostakovich","arranger":"Donald Hunsberger","duration":"6분"},{"order":2,"title":"Armenian Dances, Part I","composer":"Alfred Reed","duration":"11분"},{"order":3,"title":"First Suite in E-flat for Military Band","composer":"Gustav Holst","duration":"12분"},{"order":4,"title":"The Lord of the Rings","composer":"Johan de Meij","duration":"45분","notes":"전 5악장"}]',
    'upcoming',
    'regular',
    true
),
-- Concert 2: 봄의 향연
(
    '봄의 향연 - 특별 기획공연',
    '예산 지역의 다양한 예술가들과 함께하는 특별 기획공연입니다. 클래식과 다양한 장르의 융합을 경험하세요.',
    '2025-04-20',
    '15:00',
    '예산문화예술회관 소공연장',
    '충남 예산군 예산읍 군청로 1',
    '/images/concerts/poster-spring.jpg',
    NULL,
    '전석 10,000원',
    '[{"order":1,"title":"Spring","composer":"Antonio Vivaldi","arranger":"Calvin Custer","duration":"10분"},{"order":2,"title":"Cherry Blossoms","composer":"한국 민요","arranger":"김동진","duration":"5분"},{"order":3,"title":"Spring Breeze","composer":"예산윈드오케스트라 위촉곡","duration":"8분"}]',
    'upcoming',
    'special',
    false
),
-- Concert 3: 제48회 정기연주회
(
    '제48회 정기연주회 - 여름밤의 세레나데',
    '무더운 여름밤을 시원하게 만들어줄 아름다운 선율의 향연. 여름 저녁의 낭만을 음악으로 느껴보세요.',
    '2025-06-21',
    '19:00',
    '예산문화예술회관 대공연장',
    '충남 예산군 예산읍 군청로 1',
    '/images/concerts/poster-48th.jpg',
    NULL,
    '전석 무료 (사전 예약 필수)',
    NULL,
    'upcoming',
    'regular',
    false
),
-- Concert 4: 예산 축제 특별 공연 (festival -> special)
(
    '예산 축제 특별 공연',
    '예산 사과 축제를 기념하는 야외 특별 공연입니다.',
    '2025-10-15',
    '14:00',
    '예산 종합운동장',
    '충남 예산군 예산읍',
    NULL,
    NULL,
    NULL,
    NULL,
    'upcoming',
    'special',
    false
),
-- Concert 5: 제46회 정기연주회 (completed -> ended)
(
    '제46회 정기연주회 - 가을의 멜로디',
    '2024년 가을, 예산윈드오케스트라의 46번째 정기연주회가 성황리에 개최되었습니다.',
    '2024-11-15',
    '19:30',
    '예산문화예술회관 대공연장',
    '충남 예산군 예산읍 군청로 1',
    '/images/concerts/poster-46th.jpg',
    NULL,
    NULL,
    NULL,
    'ended',
    'regular',
    false
),
-- Concert 6: 송년음악회 2024
(
    '송년음악회 2024',
    '2024년을 마무리하며 관객 여러분께 감사의 마음을 전하는 송년음악회입니다.',
    '2024-12-20',
    '19:00',
    '예산문화예술회관 대공연장',
    '충남 예산군 예산읍 군청로 1',
    '/images/concerts/poster-newyear.jpg',
    NULL,
    NULL,
    NULL,
    'ended',
    'special',
    false
),
-- Concert 7: 제45회 정기연주회
(
    '제45회 정기연주회 - 여름의 환희',
    '2024년 여름 정기연주회.',
    '2024-07-20',
    '19:30',
    '예산문화예술회관 대공연장',
    '충남 예산군 예산읍 군청로 1',
    NULL,
    NULL,
    NULL,
    NULL,
    'ended',
    'regular',
    false
),
-- Concert 8: 제44회 정기연주회
(
    '제44회 정기연주회',
    '2024년 봄 정기연주회.',
    '2024-03-15',
    '19:30',
    '예산문화예술회관 대공연장',
    '충남 예산군 예산읍 군청로 1',
    NULL,
    NULL,
    NULL,
    NULL,
    'ended',
    'regular',
    false
),
-- Concert 9: 2023 송년음악회
(
    '2023 송년음악회',
    '2023년 송년음악회.',
    '2023-12-22',
    '19:00',
    '예산문화예술회관 대공연장',
    '충남 예산군 예산읍 군청로 1',
    NULL,
    NULL,
    NULL,
    NULL,
    'ended',
    'special',
    false
),
-- Concert 10: 제43회 정기연주회
(
    '제43회 정기연주회',
    '2023년 가을 정기연주회.',
    '2023-10-20',
    '19:30',
    '예산문화예술회관 대공연장',
    '충남 예산군 예산읍 군청로 1',
    NULL,
    NULL,
    NULL,
    NULL,
    'ended',
    'regular',
    false
);

-- ============================================================================
-- 3. PHOTO ALBUMS & GALLERY PHOTOS
-- ============================================================================

-- We need to reference concert IDs for linking albums to concerts.
-- Use a DO block with variables to capture generated UUIDs.

DO $$
DECLARE
    -- Concert IDs (matched by title)
    concert_47_id uuid;
    concert_46_id uuid;
    concert_yearend_2024_id uuid;
    concert_festival_id uuid;
    concert_45_id uuid;
    concert_44_id uuid;

    -- Album IDs
    album_1_id uuid;
    album_2_id uuid;
    album_3_id uuid;
    album_4_id uuid;
    album_5_id uuid;
    album_6_id uuid;
    album_7_id uuid;
    album_8_id uuid;
BEGIN
    -- Fetch concert IDs
    SELECT id INTO concert_47_id FROM concerts WHERE title LIKE '제47회%' LIMIT 1;
    SELECT id INTO concert_46_id FROM concerts WHERE title LIKE '제46회%' LIMIT 1;
    SELECT id INTO concert_yearend_2024_id FROM concerts WHERE title = '송년음악회 2024' LIMIT 1;
    SELECT id INTO concert_festival_id FROM concerts WHERE title = '예산 축제 특별 공연' LIMIT 1;
    SELECT id INTO concert_45_id FROM concerts WHERE title LIKE '제45회%' LIMIT 1;
    SELECT id INTO concert_44_id FROM concerts WHERE title LIKE '제44회%' LIMIT 1;

    -- ========================================================================
    -- Album 1: 제47회 정기연주회 (linked to concert)
    -- ========================================================================
    INSERT INTO photo_albums (title, description, cover_image, date, concert_id, display_order)
    VALUES (
        '제47회 정기연주회',
        '2025년 봄, 예산문화예술회관에서 개최된 정기연주회 현장 사진입니다.',
        '/images/gallery/albums/47th-concert/cover.jpg',
        '2025-03-15',
        concert_47_id,
        1
    ) RETURNING id INTO album_1_id;

    INSERT INTO gallery_photos (album_id, title, image_url, thumbnail_url, display_order) VALUES
    (album_1_id, '공연 전경',       '/images/gallery/albums/47th-concert/01.jpg', '/images/gallery/albums/47th-concert/01.jpg', 1),
    (album_1_id, '지휘자',          '/images/gallery/albums/47th-concert/02.jpg', '/images/gallery/albums/47th-concert/02.jpg', 2),
    (album_1_id, '목관 섹션',       '/images/gallery/albums/47th-concert/03.jpg', '/images/gallery/albums/47th-concert/03.jpg', 3),
    (album_1_id, '금관 섹션',       '/images/gallery/albums/47th-concert/04.jpg', '/images/gallery/albums/47th-concert/04.jpg', 4),
    (album_1_id, '타악기 섹션',     '/images/gallery/albums/47th-concert/05.jpg', '/images/gallery/albums/47th-concert/05.jpg', 5),
    (album_1_id, '전체 연주 모습',  '/images/gallery/albums/47th-concert/06.jpg', '/images/gallery/albums/47th-concert/06.jpg', 6),
    (album_1_id, '협연자',          '/images/gallery/albums/47th-concert/07.jpg', '/images/gallery/albums/47th-concert/07.jpg', 7),
    (album_1_id, '관객석',          '/images/gallery/albums/47th-concert/08.jpg', '/images/gallery/albums/47th-concert/08.jpg', 8),
    (album_1_id, '플루트 솔로',     '/images/gallery/albums/47th-concert/09.jpg', '/images/gallery/albums/47th-concert/09.jpg', 9),
    (album_1_id, '클라리넷 섹션',   '/images/gallery/albums/47th-concert/10.jpg', '/images/gallery/albums/47th-concert/10.jpg', 10),
    (album_1_id, '트럼펫 섹션',     '/images/gallery/albums/47th-concert/11.jpg', '/images/gallery/albums/47th-concert/11.jpg', 11),
    (album_1_id, '피날레',          '/images/gallery/albums/47th-concert/12.jpg', '/images/gallery/albums/47th-concert/12.jpg', 12);

    -- ========================================================================
    -- Album 2: 제46회 정기연주회
    -- ========================================================================
    INSERT INTO photo_albums (title, description, cover_image, date, concert_id, display_order)
    VALUES (
        '제46회 정기연주회',
        '2024년 가을, 풍성한 선율로 가득했던 정기연주회입니다.',
        '/images/gallery/albums/46th-concert/cover.jpg',
        '2024-11-15',
        concert_46_id,
        2
    ) RETURNING id INTO album_2_id;

    INSERT INTO gallery_photos (album_id, title, image_url, thumbnail_url, display_order) VALUES
    (album_2_id, '공연 전경',   '/images/gallery/albums/46th-concert/01.jpg', '/images/gallery/albums/46th-concert/01.jpg', 1),
    (album_2_id, '지휘자 인사', '/images/gallery/albums/46th-concert/02.jpg', '/images/gallery/albums/46th-concert/02.jpg', 2),
    (album_2_id, '연주 모습',   '/images/gallery/albums/46th-concert/03.jpg', '/images/gallery/albums/46th-concert/03.jpg', 3),
    (album_2_id, '앙코르',      '/images/gallery/albums/46th-concert/04.jpg', '/images/gallery/albums/46th-concert/04.jpg', 4),
    (album_2_id, '단체 사진',   '/images/gallery/albums/46th-concert/05.jpg', '/images/gallery/albums/46th-concert/05.jpg', 5),
    (album_2_id, '꽃다발 전달', '/images/gallery/albums/46th-concert/06.jpg', '/images/gallery/albums/46th-concert/06.jpg', 6);

    -- ========================================================================
    -- Album 3: 2024 송년음악회
    -- ========================================================================
    INSERT INTO photo_albums (title, description, cover_image, date, concert_id, display_order)
    VALUES (
        '2024 송년음악회',
        '한 해를 마무리하며 함께했던 감동의 순간들입니다.',
        '/images/gallery/albums/year-end-2024/cover.jpg',
        '2024-12-20',
        concert_yearend_2024_id,
        3
    ) RETURNING id INTO album_3_id;

    INSERT INTO gallery_photos (album_id, title, image_url, thumbnail_url, display_order) VALUES
    (album_3_id, '송년음악회 시작',  '/images/gallery/albums/year-end-2024/01.jpg', '/images/gallery/albums/year-end-2024/01.jpg', 1),
    (album_3_id, '크리스마스 캐롤',  '/images/gallery/albums/year-end-2024/02.jpg', '/images/gallery/albums/year-end-2024/02.jpg', 2),
    (album_3_id, '관객 참여',        '/images/gallery/albums/year-end-2024/03.jpg', '/images/gallery/albums/year-end-2024/03.jpg', 3),
    (album_3_id, '피날레 및 인사',   '/images/gallery/albums/year-end-2024/04.jpg', '/images/gallery/albums/year-end-2024/04.jpg', 4);

    -- ========================================================================
    -- Album 4: 2024 정기 연습 현장 (no concert link)
    -- ========================================================================
    INSERT INTO photo_albums (title, description, cover_image, date, concert_id, display_order)
    VALUES (
        '2024 정기 연습 현장',
        '매주 토요일, 열정적으로 연습하는 단원들의 모습입니다.',
        '/images/gallery/albums/rehearsal-2024/cover.jpg',
        '2024-09-01',
        NULL,
        4
    ) RETURNING id INTO album_4_id;

    INSERT INTO gallery_photos (album_id, title, image_url, thumbnail_url, display_order) VALUES
    (album_4_id, '합주 연습',   '/images/gallery/albums/rehearsal-2024/01.jpg', '/images/gallery/albums/rehearsal-2024/01.jpg', 1),
    (album_4_id, '파트 연습',   '/images/gallery/albums/rehearsal-2024/02.jpg', '/images/gallery/albums/rehearsal-2024/02.jpg', 2),
    (album_4_id, '지휘자 지도', '/images/gallery/albums/rehearsal-2024/03.jpg', '/images/gallery/albums/rehearsal-2024/03.jpg', 3),
    (album_4_id, '휴식 시간',   '/images/gallery/albums/rehearsal-2024/04.jpg', '/images/gallery/albums/rehearsal-2024/04.jpg', 4);

    -- ========================================================================
    -- Album 5: 예산 사과 축제 공연
    -- ========================================================================
    INSERT INTO photo_albums (title, description, cover_image, date, concert_id, display_order)
    VALUES (
        '예산 사과 축제 공연',
        '예산 사과 축제에서 펼친 야외 특별 공연입니다.',
        '/images/gallery/albums/apple-festival/cover.jpg',
        '2024-10-15',
        concert_festival_id,
        5
    ) RETURNING id INTO album_5_id;

    INSERT INTO gallery_photos (album_id, title, image_url, thumbnail_url, display_order) VALUES
    (album_5_id, '야외 무대 설치',  '/images/gallery/albums/apple-festival/01.jpg', '/images/gallery/albums/apple-festival/01.jpg', 1),
    (album_5_id, '공연 시작',       '/images/gallery/albums/apple-festival/02.jpg', '/images/gallery/albums/apple-festival/02.jpg', 2),
    (album_5_id, '관객들과 함께',   '/images/gallery/albums/apple-festival/03.jpg', '/images/gallery/albums/apple-festival/03.jpg', 3),
    (album_5_id, '축제 분위기',     '/images/gallery/albums/apple-festival/04.jpg', '/images/gallery/albums/apple-festival/04.jpg', 4),
    (album_5_id, '단체 기념사진',   '/images/gallery/albums/apple-festival/05.jpg', '/images/gallery/albums/apple-festival/05.jpg', 5);

    -- ========================================================================
    -- Album 6: 제45회 정기연주회
    -- ========================================================================
    INSERT INTO photo_albums (title, description, cover_image, date, concert_id, display_order)
    VALUES (
        '제45회 정기연주회',
        '2024년 여름, 시원한 선율로 가득했던 정기연주회입니다.',
        '/images/gallery/albums/45th-concert/cover.jpg',
        '2024-07-20',
        concert_45_id,
        6
    ) RETURNING id INTO album_6_id;

    INSERT INTO gallery_photos (album_id, title, image_url, thumbnail_url, display_order) VALUES
    (album_6_id, '여름 정기연주회', '/images/gallery/albums/45th-concert/01.jpg', '/images/gallery/albums/45th-concert/01.jpg', 1),
    (album_6_id, '연주 모습',       '/images/gallery/albums/45th-concert/02.jpg', '/images/gallery/albums/45th-concert/02.jpg', 2),
    (album_6_id, '협연자와 함께',   '/images/gallery/albums/45th-concert/03.jpg', '/images/gallery/albums/45th-concert/03.jpg', 3);

    -- ========================================================================
    -- Album 7: 단원 워크샵 (no concert link)
    -- ========================================================================
    INSERT INTO photo_albums (title, description, cover_image, date, concert_id, display_order)
    VALUES (
        '단원 워크샵',
        '2024년 단원 친목 및 연주력 향상 워크샵입니다.',
        '/images/gallery/albums/workshop-2024/cover.jpg',
        '2024-05-10',
        NULL,
        7
    ) RETURNING id INTO album_7_id;

    INSERT INTO gallery_photos (album_id, title, image_url, thumbnail_url, display_order) VALUES
    (album_7_id, '워크샵 강의', '/images/gallery/albums/workshop-2024/01.jpg', '/images/gallery/albums/workshop-2024/01.jpg', 1),
    (album_7_id, '그룹 활동',   '/images/gallery/albums/workshop-2024/02.jpg', '/images/gallery/albums/workshop-2024/02.jpg', 2),
    (album_7_id, '친목 시간',   '/images/gallery/albums/workshop-2024/03.jpg', '/images/gallery/albums/workshop-2024/03.jpg', 3);

    -- ========================================================================
    -- Album 8: 제44회 정기연주회
    -- ========================================================================
    INSERT INTO photo_albums (title, description, cover_image, date, concert_id, display_order)
    VALUES (
        '제44회 정기연주회',
        '2024년 봄의 시작을 알린 정기연주회입니다.',
        '/images/gallery/albums/44th-concert/cover.jpg',
        '2024-03-15',
        concert_44_id,
        8
    ) RETURNING id INTO album_8_id;

    INSERT INTO gallery_photos (album_id, title, image_url, thumbnail_url, display_order) VALUES
    (album_8_id, '봄 정기연주회', '/images/gallery/albums/44th-concert/01.jpg', '/images/gallery/albums/44th-concert/01.jpg', 1),
    (album_8_id, '연주 장면',     '/images/gallery/albums/44th-concert/02.jpg', '/images/gallery/albums/44th-concert/02.jpg', 2);

END $$;

-- ============================================================================
-- 4. GALLERY VIDEOS
-- ============================================================================

-- Link videos to concerts where applicable using subqueries
INSERT INTO gallery_videos (title, description, video_url, youtube_id, thumbnail_url, date, concert_id, display_order) VALUES
(
    '제47회 정기연주회 하이라이트',
    '2025년 봄 정기연주회의 하이라이트 영상입니다.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'dQw4w9WgXcQ',
    '/images/gallery/videos/47th-highlight.jpg',
    '2025-03-20',
    (SELECT id FROM concerts WHERE title LIKE '제47회%' LIMIT 1),
    1
),
(
    '제46회 정기연주회 - Armenian Dances',
    'Alfred Reed의 Armenian Dances 연주 영상입니다.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'dQw4w9WgXcQ',
    '/images/gallery/videos/46th-armenian.jpg',
    '2024-11-20',
    (SELECT id FROM concerts WHERE title LIKE '제46회%' LIMIT 1),
    2
),
(
    '2024 송년음악회 - 크리스마스 메들리',
    '송년음악회에서 연주한 크리스마스 메들리입니다.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'dQw4w9WgXcQ',
    '/images/gallery/videos/yearend-christmas.jpg',
    '2024-12-25',
    (SELECT id FROM concerts WHERE title = '송년음악회 2024' LIMIT 1),
    3
),
(
    '연습실 스케치 - 2024년 가을',
    '정기연주회를 준비하는 단원들의 모습입니다.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'dQw4w9WgXcQ',
    '/images/gallery/videos/rehearsal-fall.jpg',
    '2024-10-01',
    NULL,
    4
),
(
    '예산 사과 축제 공연 풀영상',
    '예산 사과 축제 야외 공연 전체 영상입니다.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'dQw4w9WgXcQ',
    '/images/gallery/videos/apple-festival.jpg',
    '2024-10-18',
    (SELECT id FROM concerts WHERE title = '예산 축제 특별 공연' LIMIT 1),
    5
),
(
    '지휘자 인터뷰 - 김영수',
    '예산윈드오케스트라 상임지휘자 김영수의 인터뷰입니다.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'dQw4w9WgXcQ',
    '/images/gallery/videos/conductor-interview.jpg',
    '2024-08-15',
    NULL,
    6
),
(
    '제45회 정기연주회 - Festive Overture',
    'Shostakovich의 Festive Overture 연주 영상입니다.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'dQw4w9WgXcQ',
    '/images/gallery/videos/45th-festive.jpg',
    '2024-07-25',
    (SELECT id FROM concerts WHERE title LIKE '제45회%' LIMIT 1),
    7
),
(
    '단원 인터뷰 - 플루트 파트',
    '플루트 파트 단원들의 인터뷰 영상입니다.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'dQw4w9WgXcQ',
    '/images/gallery/videos/flute-interview.jpg',
    '2024-06-10',
    NULL,
    8
);
