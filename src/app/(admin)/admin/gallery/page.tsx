'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, MoreHorizontal, Image as ImageIcon, Video as VideoIcon, Eye, Upload, Loader2, Star, X, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSupabase } from '@/hooks/use-supabase';
import type { Album, Video as VideoType } from '@/data/gallery';

const categoryColors: Record<string, string> = {
  concert: 'bg-blue-100 text-blue-700',
  rehearsal: 'bg-green-100 text-green-700',
  event: 'bg-purple-100 text-purple-700',
  interview: 'bg-amber-100 text-amber-700',
  etc: 'bg-muted text-foreground',
};

function parseYoutubeId(url: string): string | null {
  // https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  return null;
}

export default function GalleryAdminPage() {
  const supabase = useSupabase();
  const [activeTab, setActiveTab] = useState('albums');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Album | VideoType | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Photo management state
  const [isPhotoManageOpen, setIsPhotoManageOpen] = useState(false);
  const [managingAlbum, setManagingAlbum] = useState<Album | null>(null);
  const [albumPhotos, setAlbumPhotos] = useState<{ id: string; image_url: string; title: string | null; storage_path?: string }[]>([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Album form state
  const [formAlbumTitle, setFormAlbumTitle] = useState('');
  const [formAlbumDate, setFormAlbumDate] = useState('');
  const [formAlbumDescription, setFormAlbumDescription] = useState('');

  // Video form state
  const [formVideoTitle, setFormVideoTitle] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formVideoDate, setFormVideoDate] = useState('');
  const [formVideoDescription, setFormVideoDescription] = useState('');

  // Edit form state (shared for both albums and videos)
  const [formEditTitle, setFormEditTitle] = useState('');
  const [formEditDate, setFormEditDate] = useState('');
  const [formEditDescription, setFormEditDescription] = useState('');
  const [formEditVideoUrl, setFormEditVideoUrl] = useState('');

  const resetForm = () => {
    setFormAlbumTitle('');
    setFormAlbumDate('');
    setFormAlbumDescription('');
    setFormVideoTitle('');
    setFormVideoUrl('');
    setFormVideoDate('');
    setFormVideoDescription('');
    setFormEditTitle('');
    setFormEditDate('');
    setFormEditDescription('');
    setFormEditVideoUrl('');
  };

  const fetchAlbums = useCallback(async () => {
    const { data: dbAlbums, error: albumError } = await supabase
      .from('photo_albums')
      .select('*')
      .order('date', { ascending: false, nullsFirst: false });

    if (albumError) {
      console.error('Error fetching albums:', albumError);
      setAlbums([]);
      return;
    }

    if (!dbAlbums || dbAlbums.length === 0) {
      setAlbums([]);
      return;
    }

    const albumIds = dbAlbums.map((a) => a.id);
    const { data: dbPhotos } = await supabase
      .from('gallery_photos')
      .select('*')
      .in('album_id', albumIds)
      .order('display_order', { ascending: true });

    const photosByAlbum = new Map<string, number>();
    for (const photo of dbPhotos || []) {
      photosByAlbum.set(photo.album_id, (photosByAlbum.get(photo.album_id) || 0) + 1);
    }

    setAlbums(
      dbAlbums.map((a) => ({
        id: a.id,
        title: a.title,
        description: a.description || undefined,
        date: a.date || '',
        coverImage: a.cover_image || '/images/gallery/default-cover.jpg',
        photoCount: photosByAlbum.get(a.id) || 0,
        category: 'concert' as const,
        categoryLabel: '연주회',
        photos: [],
      }))
    );
  }, [supabase]);

  const fetchVideos = useCallback(async () => {
    const { data: dbVideos, error } = await supabase
      .from('gallery_videos')
      .select('*')
      .order('date', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Error fetching videos:', error);
      setVideos([]);
      return;
    }

    setVideos(
      (dbVideos || []).map((v) => ({
        id: v.id,
        title: v.title,
        description: v.description || undefined,
        date: v.date || '',
        youtubeId: v.youtube_id || '',
        thumbnailUrl: v.thumbnail_url || '',
        duration: '',
        category: 'concert' as const,
        categoryLabel: '연주회',
      }))
    );
  }, [supabase]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await Promise.all([fetchAlbums(), fetchVideos()]);
      setLoading(false);
    }
    loadData();
  }, [fetchAlbums, fetchVideos]);

  const handleCreate = async () => {
    if (activeTab === 'albums') {
      if (!formAlbumTitle.trim()) return;
      setSaving(true);

      const { error } = await supabase.from('photo_albums').insert({
        title: formAlbumTitle.trim(),
        date: formAlbumDate || null,
        description: formAlbumDescription.trim() || null,
      });

      setSaving(false);
      if (error) {
        console.error('Error creating album:', error);
        alert('앨범 추가에 실패했습니다.');
        return;
      }

      setIsCreateOpen(false);
      resetForm();
      fetchAlbums();
    } else {
      if (!formVideoTitle.trim() || !formVideoUrl.trim()) return;
      setSaving(true);

      const youtubeId = parseYoutubeId(formVideoUrl.trim());
      const thumbnailUrl = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
        : null;

      const { error } = await supabase.from('gallery_videos').insert({
        title: formVideoTitle.trim(),
        video_url: formVideoUrl.trim(),
        youtube_id: youtubeId,
        thumbnail_url: thumbnailUrl,
        date: formVideoDate || null,
        description: formVideoDescription.trim() || null,
      });

      setSaving(false);
      if (error) {
        console.error('Error creating video:', error);
        alert('영상 추가에 실패했습니다.');
        return;
      }

      setIsCreateOpen(false);
      resetForm();
      fetchVideos();
    }
  };

  const handleEdit = async () => {
    if (!selectedItem || !formEditTitle.trim()) return;
    setSaving(true);

    if (activeTab === 'albums') {
      const { error } = await supabase
        .from('photo_albums')
        .update({
          title: formEditTitle.trim(),
          date: formEditDate || null,
          description: formEditDescription.trim() || null,
        })
        .eq('id', selectedItem.id);

      setSaving(false);
      if (error) {
        console.error('Error updating album:', error);
        alert('앨범 수정에 실패했습니다.');
        return;
      }

      setIsEditOpen(false);
      resetForm();
      fetchAlbums();
    } else {
      const youtubeId = formEditVideoUrl
        ? parseYoutubeId(formEditVideoUrl.trim())
        : (selectedItem as VideoType).youtubeId || null;
      const thumbnailUrl = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
        : null;

      const updateData: Record<string, unknown> = {
        title: formEditTitle.trim(),
        date: formEditDate || null,
        description: formEditDescription.trim() || null,
      };

      if (formEditVideoUrl.trim()) {
        updateData.video_url = formEditVideoUrl.trim();
        updateData.youtube_id = youtubeId;
        updateData.thumbnail_url = thumbnailUrl;
      }

      const { error } = await supabase
        .from('gallery_videos')
        .update(updateData)
        .eq('id', selectedItem.id);

      setSaving(false);
      if (error) {
        console.error('Error updating video:', error);
        alert('영상 수정에 실패했습니다.');
        return;
      }

      setIsEditOpen(false);
      resetForm();
      fetchVideos();
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setSaving(true);

    const table = activeTab === 'albums' ? 'photo_albums' : 'gallery_videos';
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', selectedItem.id);

    setSaving(false);
    if (error) {
      console.error('Error deleting:', error);
      alert(activeTab === 'albums' ? '앨범 삭제에 실패했습니다.' : '영상 삭제에 실패했습니다.');
      return;
    }

    setIsDeleteOpen(false);
    setSelectedItem(null);
    if (activeTab === 'albums') {
      fetchAlbums();
    } else {
      fetchVideos();
    }
  };

  const openEditDialog = (item: Album | VideoType) => {
    setSelectedItem(item);
    setFormEditTitle(item.title);
    setFormEditDate(item.date);
    setFormEditDescription(item.description || '');
    if (activeTab === 'videos') {
      const video = item as VideoType;
      setFormEditVideoUrl(video.youtubeId ? `https://youtube.com/watch?v=${video.youtubeId}` : '');
    } else {
      setFormEditVideoUrl('');
    }
    setIsEditOpen(true);
  };

  const fetchAlbumPhotos = useCallback(async (albumId: string) => {
    setPhotosLoading(true);
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('id, image_url, title')
      .eq('album_id', albumId)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching photos:', error);
      setAlbumPhotos([]);
    } else {
      setAlbumPhotos(
        (data || []).map((p) => {
          // Extract storage path from URL for deletion
          const match = p.image_url?.match(/gallery-photos\/(.+)$/);
          return { ...p, storage_path: match ? match[1] : undefined };
        })
      );
    }
    setPhotosLoading(false);
  }, [supabase]);

  const openPhotoManage = (album: Album) => {
    setManagingAlbum(album);
    setIsPhotoManageOpen(true);
    fetchAlbumPhotos(album.id);
  };

  const handlePhotoUpload = async (files: FileList) => {
    if (!managingAlbum) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `albums/${managingAlbum.id}/${timestamp}_${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-photos')
        .upload(path, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert(`업로드 실패: ${file.name}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('gallery-photos')
        .getPublicUrl(path);

      const imageUrl = urlData.publicUrl;

      const { error: insertError } = await supabase
        .from('gallery_photos')
        .insert({
          album_id: managingAlbum.id,
          image_url: imageUrl,
          title: file.name.replace(/\.[^/.]+$/, ''),
        });

      if (insertError) {
        console.error('Insert error:', insertError);
      }
    }

    // Auto-set cover if album has none
    const { data: album } = await supabase
      .from('photo_albums')
      .select('cover_image')
      .eq('id', managingAlbum.id)
      .single();

    if (album && !album.cover_image) {
      const { data: firstPhoto } = await supabase
        .from('gallery_photos')
        .select('image_url')
        .eq('album_id', managingAlbum.id)
        .order('display_order', { ascending: true })
        .limit(1)
        .single();

      if (firstPhoto) {
        await supabase
          .from('photo_albums')
          .update({ cover_image: firstPhoto.image_url })
          .eq('id', managingAlbum.id);
      }
    }

    setUploading(false);
    fetchAlbumPhotos(managingAlbum.id);
    fetchAlbums();
  };

  const handlePhotoDelete = async (photoId: string, storagePath?: string) => {
    if (!managingAlbum) return;

    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from('gallery-photos')
        .remove([storagePath]);
      if (storageError) {
        console.error('Storage delete error:', storageError);
      }
    }

    const { error } = await supabase
      .from('gallery_photos')
      .delete()
      .eq('id', photoId);

    if (error) {
      console.error('Delete error:', error);
      alert('사진 삭제에 실패했습니다.');
      return;
    }

    fetchAlbumPhotos(managingAlbum.id);
    fetchAlbums();
  };

  const handleSetCover = async (imageUrl: string) => {
    if (!managingAlbum) return;

    const { error } = await supabase
      .from('photo_albums')
      .update({ cover_image: imageUrl })
      .eq('id', managingAlbum.id);

    if (error) {
      console.error('Set cover error:', error);
      alert('커버 설정에 실패했습니다.');
      return;
    }

    setManagingAlbum({ ...managingAlbum, coverImage: imageUrl });
    fetchAlbums();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">갤러리 관리</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            사진 앨범과 영상을 관리합니다.
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsCreateOpen(true);
          }}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {activeTab === 'albums' ? '앨범 추가' : '영상 추가'}
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">데이터를 불러오는 중...</span>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted">
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            사진 앨범 ({albums.length})
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            <VideoIcon className="mr-2 h-4 w-4" />
            영상 ({videos.length})
          </TabsTrigger>
        </TabsList>

        {/* Albums Grid */}
        <TabsContent value="albums" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {albums.map((album) => (
              <Card key={album.id} className="group overflow-hidden bg-card border-border">
                <div className="relative aspect-[4/3] bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary" className="h-9 w-9" asChild>
                        <a href={`/gallery/photos/${album.id}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9"
                        onClick={() => openEditDialog(album)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-9 w-9"
                        onClick={() => {
                          setSelectedItem(album);
                          setIsDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {/* Photo count badge */}
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/60 text-white border-0">
                      <ImageIcon className="mr-1 h-3 w-3" />
                      {album.photoCount}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Badge className={categoryColors[album.category] || 'bg-muted'}>
                        {album.categoryLabel}
                      </Badge>
                      <h3 className="mt-2 font-medium text-foreground truncate">
                        {album.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{album.date}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a href={`/gallery/photos/${album.id}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="mr-2 h-4 w-4" />
                            보기
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openPhotoManage(album)}>
                          <Images className="mr-2 h-4 w-4" />
                          사진 관리
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(album)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedItem(album);
                            setIsDeleteOpen(true);
                          }}
                          className="text-red-600 focus:bg-red-50 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos Grid */}
        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Card key={video.id} className="group overflow-hidden bg-card border-border">
                <div className="relative aspect-video bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <VideoIcon className="h-12 w-12" />
                  </div>
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white transition-transform group-hover:scale-110">
                      <svg className="h-6 w-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/60 text-white border-0">
                      {video.duration}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Badge className={categoryColors[video.category] || 'bg-muted'}>
                        {video.categoryLabel}
                      </Badge>
                      <h3 className="mt-2 font-medium text-foreground truncate">
                        {video.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{video.date}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a
                            href={`https://youtube.com/watch?v=${video.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            YouTube에서 보기
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(video)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedItem(video);
                            setIsDeleteOpen(true);
                          }}
                          className="text-red-600 focus:bg-red-50 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Dialog - Album */}
      <Dialog open={isCreateOpen && activeTab === 'albums'} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>앨범 추가</DialogTitle>
            <DialogDescription>
              새로운 사진 앨범을 추가하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="album-title">앨범명</Label>
              <Input
                id="album-title"
                placeholder="제47회 정기연주회"
                className=""
                value={formAlbumTitle}
                onChange={(e) => setFormAlbumTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="album-date">날짜</Label>
                <Input
                  id="album-date"
                  type="date"
                  className=""
                  value={formAlbumDate}
                  onChange={(e) => setFormAlbumDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="album-category">카테고리</Label>
                <select
                  id="album-category"
                  className="h-9 w-full rounded-md border border-border bg-transparent px-3 text-sm"
                >
                  <option value="concert">연주회</option>
                  <option value="rehearsal">연습</option>
                  <option value="event">행사</option>
                  <option value="etc">기타</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="album-description">설명 (선택)</Label>
              <Textarea
                id="album-description"
                placeholder="앨범에 대한 설명을 입력하세요."
                rows={2}
                className=""
                value={formAlbumDescription}
                onChange={(e) => setFormAlbumDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>사진 업로드</Label>
              <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  클릭하거나 파일을 드래그하여 업로드
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG 파일 (최대 10MB)
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)} disabled={saving}>
              취소
            </Button>
            <Button
              onClick={handleCreate}
              disabled={saving || !formAlbumTitle.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Dialog - Video */}
      <Dialog open={isCreateOpen && activeTab === 'videos'} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>영상 추가</DialogTitle>
            <DialogDescription>
              YouTube 영상을 추가하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="video-title">영상 제목</Label>
              <Input
                id="video-title"
                placeholder="제47회 정기연주회 하이라이트"
                className=""
                value={formVideoTitle}
                onChange={(e) => setFormVideoTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="video-url">YouTube URL</Label>
              <Input
                id="video-url"
                placeholder="https://youtube.com/watch?v=..."
                className=""
                value={formVideoUrl}
                onChange={(e) => setFormVideoUrl(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="video-date">날짜</Label>
                <Input
                  id="video-date"
                  type="date"
                  className=""
                  value={formVideoDate}
                  onChange={(e) => setFormVideoDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="video-category">카테고리</Label>
                <select
                  id="video-category"
                  className="h-9 w-full rounded-md border border-border bg-transparent px-3 text-sm"
                >
                  <option value="concert">연주회</option>
                  <option value="rehearsal">연습</option>
                  <option value="interview">인터뷰</option>
                  <option value="etc">기타</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="video-description">설명 (선택)</Label>
              <Textarea
                id="video-description"
                placeholder="영상에 대한 설명을 입력하세요."
                rows={2}
                className=""
                value={formVideoDescription}
                onChange={(e) => setFormVideoDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)} disabled={saving}>
              취소
            </Button>
            <Button
              onClick={handleCreate}
              disabled={saving || !formVideoTitle.trim() || !formVideoUrl.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {activeTab === 'albums' ? '앨범 수정' : '영상 수정'}
            </DialogTitle>
            <DialogDescription>
              정보를 수정하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">제목</Label>
              <Input
                id="edit-title"
                value={formEditTitle}
                onChange={(e) => setFormEditTitle(e.target.value)}
                className=""
              />
            </div>
            {activeTab === 'videos' && (
              <div className="grid gap-2">
                <Label htmlFor="edit-video-url">YouTube URL</Label>
                <Input
                  id="edit-video-url"
                  value={formEditVideoUrl}
                  onChange={(e) => setFormEditVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className=""
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="edit-date">날짜</Label>
              <Input
                id="edit-date"
                type="date"
                value={formEditDate}
                onChange={(e) => setFormEditDate(e.target.value)}
                className=""
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">설명</Label>
              <Textarea
                id="edit-description"
                value={formEditDescription}
                onChange={(e) => setFormEditDescription(e.target.value)}
                rows={3}
                className=""
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={saving}>
              취소
            </Button>
            <Button
              onClick={handleEdit}
              disabled={saving || !formEditTitle.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {activeTab === 'albums' ? '앨범 삭제' : '영상 삭제'}
            </DialogTitle>
            <DialogDescription>
              정말로 &quot;{selectedItem?.title}&quot;을(를) 삭제하시겠습니까?
              <br />
              이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={saving}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Photo Management Dialog */}
      <Dialog open={isPhotoManageOpen} onOpenChange={setIsPhotoManageOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>사진 관리 — {managingAlbum?.title}</DialogTitle>
            <DialogDescription>
              사진을 업로드하거나 삭제하고, 커버 이미지를 설정하세요.
            </DialogDescription>
          </DialogHeader>

          {/* Upload Area */}
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handlePhotoUpload(e.target.files);
                  e.target.value = '';
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            />
            <div className="rounded-lg border-2 border-dashed border-border p-6 text-center hover:border-gold-500/50 transition-colors">
              {uploading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-gold-500" />
                  <span className="text-sm text-muted-foreground">업로드 중...</span>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-1 text-sm text-muted-foreground">
                    클릭하거나 파일을 드래그하여 업로드 (JPG, PNG, 최대 10MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Photo Grid */}
          <ScrollArea className="flex-1 min-h-0">
            {photosLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : albumPhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <ImageIcon className="h-10 w-10 mb-2" />
                <p className="text-sm">아직 사진이 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pr-3">
                {albumPhotos.map((photo) => {
                  const isCover = managingAlbum?.coverImage === photo.image_url;
                  return (
                    <div key={photo.id} className="group relative rounded-lg overflow-hidden border border-border bg-muted">
                      <div className="aspect-square relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.image_url}
                          alt={photo.title || '사진'}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {isCover && (
                          <div className="absolute top-1.5 left-1.5">
                            <Badge className="bg-gold-500 text-white border-0 text-[10px] px-1.5 py-0.5">
                              <Star className="mr-0.5 h-2.5 w-2.5" fill="currentColor" />
                              커버
                            </Badge>
                          </div>
                        )}
                        {/* Action buttons on hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          {!isCover && (
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8"
                              title="커버로 설정"
                              onClick={() => handleSetCover(photo.image_url)}
                            >
                              <Star className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8"
                            title="삭제"
                            onClick={() => handlePhotoDelete(photo.id, photo.storage_path)}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          <DialogFooter>
            <p className="text-xs text-muted-foreground mr-auto">
              {albumPhotos.length}장의 사진
            </p>
            <Button variant="outline" onClick={() => setIsPhotoManageOpen(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
