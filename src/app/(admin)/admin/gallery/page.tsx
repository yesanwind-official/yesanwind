'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, MoreHorizontal, Image as ImageIcon, Video as VideoIcon, Eye, Upload } from 'lucide-react';
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
import { mockAlbums, mockVideos, type Album, type Video as VideoType } from '@/data/gallery';

const categoryColors: Record<string, string> = {
  concert: 'bg-blue-100 text-blue-700',
  rehearsal: 'bg-green-100 text-green-700',
  event: 'bg-purple-100 text-purple-700',
  interview: 'bg-amber-100 text-amber-700',
  etc: 'bg-neutral-100 text-neutral-700',
};

export default function GalleryAdminPage() {
  const [activeTab, setActiveTab] = useState('albums');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Album | VideoType | null>(null);

  const handleCreate = () => {
    console.log('Create:', activeTab);
    setIsCreateOpen(false);
  };

  const handleEdit = () => {
    console.log('Edit:', selectedItem?.id);
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    console.log('Delete:', selectedItem?.id);
    setIsDeleteOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">갤러리 관리</h1>
          <p className="mt-1 text-sm text-neutral-500">
            사진 앨범과 영상을 관리합니다.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {activeTab === 'albums' ? '앨범 추가' : '영상 추가'}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-neutral-200">
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            사진 앨범 ({mockAlbums.length})
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            <VideoIcon className="mr-2 h-4 w-4" />
            영상 ({mockVideos.length})
          </TabsTrigger>
        </TabsList>

        {/* Albums Grid */}
        <TabsContent value="albums" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockAlbums.map((album) => (
              <Card key={album.id} className="group overflow-hidden bg-white border-neutral-200">
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
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
                        onClick={() => {
                          setSelectedItem(album);
                          setIsEditOpen(true);
                        }}
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
                      <Badge className={categoryColors[album.category] || 'bg-neutral-100'}>
                        {album.categoryLabel}
                      </Badge>
                      <h3 className="mt-2 font-medium text-neutral-900 truncate">
                        {album.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">{album.date}</p>
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
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedItem(album);
                            setIsEditOpen(true);
                          }}
                        >
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
            {mockVideos.map((video) => (
              <Card key={video.id} className="group overflow-hidden bg-white border-neutral-200">
                <div className="relative aspect-video bg-neutral-100">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
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
                      <Badge className={categoryColors[video.category] || 'bg-neutral-100'}>
                        {video.categoryLabel}
                      </Badge>
                      <h3 className="mt-2 font-medium text-neutral-900 truncate">
                        {video.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">{video.date}</p>
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
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedItem(video);
                            setIsEditOpen(true);
                          }}
                        >
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
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>앨범 추가</DialogTitle>
            <DialogDescription>
              새로운 사진 앨범을 추가하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="album-title">앨범명</Label>
              <Input id="album-title" placeholder="제47회 정기연주회" className="bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="album-date">날짜</Label>
                <Input id="album-date" type="date" className="bg-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="album-category">카테고리</Label>
                <select
                  id="album-category"
                  className="h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm"
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
                className="bg-white"
              />
            </div>
            <div className="grid gap-2">
              <Label>사진 업로드</Label>
              <div className="rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center">
                <Upload className="mx-auto h-8 w-8 text-neutral-400" />
                <p className="mt-2 text-sm text-neutral-600">
                  클릭하거나 파일을 드래그하여 업로드
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  JPG, PNG 파일 (최대 10MB)
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreate} className="bg-gold-500 hover:bg-gold-600 text-white">
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Dialog - Video */}
      <Dialog open={isCreateOpen && activeTab === 'videos'} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>영상 추가</DialogTitle>
            <DialogDescription>
              YouTube 영상을 추가하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="video-title">영상 제목</Label>
              <Input id="video-title" placeholder="제47회 정기연주회 하이라이트" className="bg-white" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="video-url">YouTube URL</Label>
              <Input
                id="video-url"
                placeholder="https://youtube.com/watch?v=..."
                className="bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="video-date">날짜</Label>
                <Input id="video-date" type="date" className="bg-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="video-category">카테고리</Label>
                <select
                  id="video-category"
                  className="h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm"
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
                className="bg-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreate} className="bg-gold-500 hover:bg-gold-600 text-white">
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg bg-white">
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
                defaultValue={selectedItem?.title}
                className="bg-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-date">날짜</Label>
              <Input
                id="edit-date"
                type="date"
                defaultValue={selectedItem?.date}
                className="bg-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">설명</Label>
              <Textarea
                id="edit-description"
                defaultValue={selectedItem?.description}
                rows={3}
                className="bg-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEdit} className="bg-gold-500 hover:bg-gold-600 text-white">
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-white">
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
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
