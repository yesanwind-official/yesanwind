'use client';

import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, Eye, MoreHorizontal, Pin, PinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column } from '@/components/admin';
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
import { notices, pressReleases, type Post } from '@/data/posts';

interface PostRow {
  id: string;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  views: number;
  isPinned?: boolean;
  source?: string;
}

const noticeData: PostRow[] = notices.map((post) => ({
  id: post.id,
  category: post.category,
  title: post.title,
  author: post.author,
  createdAt: post.createdAt,
  views: post.views,
  isPinned: post.isPinned,
}));

const pressData: PostRow[] = pressReleases.map((post) => ({
  id: post.id,
  category: post.category,
  title: post.title,
  author: post.author,
  createdAt: post.createdAt,
  views: post.views,
  source: post.source,
}));

export default function PostsAdminPage() {
  const [activeTab, setActiveTab] = useState('notice');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostRow | null>(null);

  const currentData = activeTab === 'notice' ? noticeData : pressData;

  const handleCreate = () => {
    console.log('Create post:', activeTab);
    setIsCreateOpen(false);
  };

  const handleEdit = () => {
    console.log('Edit post:', selectedPost?.id);
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    console.log('Delete post:', selectedPost?.id);
    setIsDeleteOpen(false);
  };

  const handleTogglePin = (id: string, isPinned: boolean) => {
    console.log('Toggle pin:', id, !isPinned);
  };

  const noticeColumns: Column<PostRow>[] = [
    {
      key: 'title',
      header: '제목',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2 max-w-md">
          {row.isPinned && (
            <Pin className="h-4 w-4 shrink-0 text-gold-500" />
          )}
          <span className="font-medium text-neutral-900 truncate">{row.title}</span>
        </div>
      ),
    },
    {
      key: 'author',
      header: '작성자',
      cell: (row) => <span className="text-neutral-700">{row.author}</span>,
    },
    {
      key: 'createdAt',
      header: '작성일',
      sortable: true,
      cell: (row) => <span className="text-neutral-700">{row.createdAt}</span>,
    },
    {
      key: 'views',
      header: '조회수',
      sortable: true,
      cell: (row) => <span className="text-neutral-700">{row.views.toLocaleString()}</span>,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-[50px]',
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={`/board/notice/${row.id}`} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                보기
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTogglePin(row.id, row.isPinned || false)}>
              {row.isPinned ? (
                <>
                  <PinOff className="mr-2 h-4 w-4" />
                  고정 해제
                </>
              ) : (
                <>
                  <Pin className="mr-2 h-4 w-4" />
                  상단 고정
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedPost(row);
                setIsEditOpen(true);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedPost(row);
                setIsDeleteOpen(true);
              }}
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const pressColumns: Column<PostRow>[] = [
    {
      key: 'title',
      header: '제목',
      sortable: true,
      cell: (row) => (
        <span className="font-medium text-neutral-900 truncate max-w-md block">{row.title}</span>
      ),
    },
    {
      key: 'source',
      header: '출처',
      cell: (row) => (
        <Badge variant="outline" className="bg-white">
          {row.source || row.author}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: '작성일',
      sortable: true,
      cell: (row) => <span className="text-neutral-700">{row.createdAt}</span>,
    },
    {
      key: 'views',
      header: '조회수',
      sortable: true,
      cell: (row) => <span className="text-neutral-700">{row.views.toLocaleString()}</span>,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-[50px]',
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={`/board/press/${row.id}`} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                보기
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedPost(row);
                setIsEditOpen(true);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedPost(row);
                setIsDeleteOpen(true);
              }}
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">게시판 관리</h1>
          <p className="mt-1 text-sm text-neutral-500">
            공지사항과 언론보도를 관리합니다.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {activeTab === 'notice' ? '공지사항 작성' : '언론보도 등록'}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-neutral-200">
          <TabsTrigger
            value="notice"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            공지사항 ({noticeData.length})
          </TabsTrigger>
          <TabsTrigger
            value="press"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            언론보도 ({pressData.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notice" className="mt-6">
          <DataTable
            data={noticeData}
            columns={noticeColumns}
            searchKey="title"
            searchPlaceholder="제목으로 검색..."
            pageSize={10}
          />
        </TabsContent>

        <TabsContent value="press" className="mt-6">
          <DataTable
            data={pressData}
            columns={pressColumns}
            searchKey="title"
            searchPlaceholder="제목으로 검색..."
            pageSize={10}
          />
        </TabsContent>
      </Tabs>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>
              {activeTab === 'notice' ? '공지사항 작성' : '언론보도 등록'}
            </DialogTitle>
            <DialogDescription>
              {activeTab === 'notice'
                ? '새로운 공지사항을 작성하세요.'
                : '언론보도 정보를 등록하세요.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">제목</Label>
              <Input id="title" placeholder="제목을 입력하세요" className="bg-white" />
            </div>
            {activeTab === 'press' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="source">출처</Label>
                  <Input id="source" placeholder="충남일보" className="bg-white" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sourceUrl">원문 링크</Label>
                  <Input id="sourceUrl" placeholder="https://..." className="bg-white" />
                </div>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                placeholder="내용을 입력하세요."
                rows={10}
                className="bg-white"
              />
            </div>
            {activeTab === 'notice' && (
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isPinned" className="h-4 w-4" />
                <Label htmlFor="isPinned" className="font-normal">
                  상단에 고정
                </Label>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreate} className="bg-gold-500 hover:bg-gold-600 text-white">
              등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>게시글 수정</DialogTitle>
            <DialogDescription>
              게시글 내용을 수정하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">제목</Label>
              <Input
                id="edit-title"
                defaultValue={selectedPost?.title}
                className="bg-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-content">내용</Label>
              <Textarea
                id="edit-content"
                placeholder="내용을 입력하세요."
                rows={10}
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
            <DialogTitle>게시글 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 게시글을 삭제하시겠습니까?
              <br />
              <span className="font-medium text-neutral-900">&quot;{selectedPost?.title}&quot;</span>
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
