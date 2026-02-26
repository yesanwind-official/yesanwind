import { createClient } from '@/lib/supabase/server';
import type { Album, Photo, Video } from '@/data/gallery';
import type { Tables } from '@/types/database';

// ============================================================================
// Type Aliases for DB rows
// ============================================================================

type DbAlbum = Tables<'photo_albums'>;
type DbPhoto = Tables<'gallery_photos'>;
type DbVideo = Tables<'gallery_videos'>;

// ============================================================================
// Mappers: DB row -> UI type
// ============================================================================

function toUIPhoto(dbPhoto: DbPhoto, index: number): Photo {
  return {
    id: dbPhoto.id,
    src: dbPhoto.image_url,
    alt: dbPhoto.title || `사진 ${index + 1}`,
    width: 1200,
    height: 800,
  };
}

function toUIAlbum(dbAlbum: DbAlbum, dbPhotos: DbPhoto[]): Album {
  return {
    id: dbAlbum.id,
    title: dbAlbum.title,
    description: dbAlbum.description || undefined,
    date: dbAlbum.date || '',
    coverImage: dbAlbum.cover_image || '/images/gallery/default-cover.jpg',
    photoCount: dbPhotos.length,
    category: 'concert',
    categoryLabel: '연주회',
    photos: dbPhotos
      .sort((a, b) => a.display_order - b.display_order)
      .map((p, i) => toUIPhoto(p, i)),
  };
}

function toUIVideo(dbVideo: DbVideo): Video {
  return {
    id: dbVideo.id,
    title: dbVideo.title,
    description: dbVideo.description || undefined,
    date: dbVideo.date || '',
    youtubeId: dbVideo.youtube_id || '',
    thumbnailUrl: dbVideo.thumbnail_url || '',
    duration: '',
    category: 'concert',
    categoryLabel: '연주회',
  };
}

// ============================================================================
// Album Queries
// ============================================================================

/**
 * 전체 앨범 목록 조회 (사진 포함, 날짜 내림차순)
 */
export async function getAllAlbums(): Promise<Album[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data: albums, error: albumError } = await supabase
    .from('photo_albums')
    .select('*')
    .order('date', { ascending: false, nullsFirst: false });

  if (albumError) {
    console.error('Error fetching albums:', albumError);
    return [];
  }

  if (!albums || albums.length === 0) return [];

  // Fetch all photos for these albums in a single query
  const albumIds = albums.map((a) => a.id);
  const { data: photos, error: photoError } = await supabase
    .from('gallery_photos')
    .select('*')
    .in('album_id', albumIds)
    .order('display_order', { ascending: true });

  if (photoError) {
    console.error('Error fetching photos:', photoError);
  }

  const photosByAlbum = new Map<string, DbPhoto[]>();
  for (const photo of photos || []) {
    const list = photosByAlbum.get(photo.album_id) || [];
    list.push(photo);
    photosByAlbum.set(photo.album_id, list);
  }

  return albums.map((album) => toUIAlbum(album, photosByAlbum.get(album.id) || []));
}

/**
 * 단일 앨범 조회 (사진 포함)
 */
export async function getAlbumById(id: string): Promise<Album | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: album, error: albumError } = await supabase
    .from('photo_albums')
    .select('*')
    .eq('id', id)
    .single();

  if (albumError || !album) {
    console.error('Error fetching album:', albumError);
    return null;
  }

  const { data: photos, error: photoError } = await supabase
    .from('gallery_photos')
    .select('*')
    .eq('album_id', id)
    .order('display_order', { ascending: true });

  if (photoError) {
    console.error('Error fetching album photos:', photoError);
  }

  return toUIAlbum(album, photos || []);
}

/**
 * 최근 앨범 조회 (사진 포함)
 */
export async function getRecentAlbums(count: number = 4): Promise<Album[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data: albums, error: albumError } = await supabase
    .from('photo_albums')
    .select('*')
    .order('date', { ascending: false, nullsFirst: false })
    .limit(count);

  if (albumError) {
    console.error('Error fetching recent albums:', albumError);
    return [];
  }

  if (!albums || albums.length === 0) return [];

  const albumIds = albums.map((a) => a.id);
  const { data: photos, error: photoError } = await supabase
    .from('gallery_photos')
    .select('*')
    .in('album_id', albumIds)
    .order('display_order', { ascending: true });

  if (photoError) {
    console.error('Error fetching photos for recent albums:', photoError);
  }

  const photosByAlbum = new Map<string, DbPhoto[]>();
  for (const photo of photos || []) {
    const list = photosByAlbum.get(photo.album_id) || [];
    list.push(photo);
    photosByAlbum.set(photo.album_id, list);
  }

  return albums.map((album) => toUIAlbum(album, photosByAlbum.get(album.id) || []));
}

// ============================================================================
// Video Queries
// ============================================================================

/**
 * 전체 영상 목록 조회 (날짜 내림차순)
 */
export async function getAllVideos(): Promise<Video[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('gallery_videos')
    .select('*')
    .order('date', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }

  return (data || []).map(toUIVideo);
}

/**
 * 최근 영상 조회
 */
export async function getRecentVideos(count: number = 4): Promise<Video[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('gallery_videos')
    .select('*')
    .order('date', { ascending: false, nullsFirst: false })
    .limit(count);

  if (error) {
    console.error('Error fetching recent videos:', error);
    return [];
  }

  return (data || []).map(toUIVideo);
}
