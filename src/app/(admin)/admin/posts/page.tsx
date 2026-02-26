'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Eye, MoreHorizontal, Pin, PinOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable, Column, SortOption } from '@/components/admin';
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
import { useSupabase } from '@/hooks/use-supabase';

interface PostRow {
  id: string;
  category: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  isPinned: boolean;
}

export default function PostsAdminPage() {
  const supabase = useSupabase();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostRow | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formIsPinned, setFormIsPinned] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', 'notice')
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
      return;
    }

    setPosts(
      (data || []).map((post) => ({
        id: post.id,
        category: post.category,
        title: post.title,
        content: post.content,
        author: '관리자',
        createdAt: post.published_at.split('T')[0],
        views: post.view_count,
        isPinned: post.is_pinned,
      }))
    );
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const resetForm = () => {
    setFormTitle('');
    setFormContent('');
    setFormIsPinned(false);
  };

  const handleCreate = async () => {
    if (!formTitle.trim() || !formContent.trim()) return;
    setSaving(true);

    const { error } = await supabase.from('posts').insert({
      title: formTitle.trim(),
      content: formContent.trim(),
      category: 'notice' as const,
      is_pinned: formIsPinned,
    });

    setSaving(false);
    if (error) {
      console.error('Error creating post:', error);
      alert('게시글 등록에 실패했습니다.');
      return;
    }

    setIsCreateOpen(false);
    resetForm();
    fetchPosts();
  };

  const handleEdit = async () => {
    if (!selectedPost || !formTitle.trim() || !formContent.trim()) return;
    setSaving(true);

    const { error } = await supabase
      .from('posts')
      .update({
        title: formTitle.trim(),
        content: formContent.trim(),
        is_pinned: formIsPinned,
      })
      .eq('id', selectedPost.id);

    setSaving(false);
    if (error) {
      console.error('Error updating post:', error);
      alert('게시글 수정에 실패했습니다.');
      return;
    }

    setIsEditOpen(false);
    resetForm();
    fetchPosts();
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    setSaving(true);

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', selectedPost.id);

    setSaving(false);
    if (error) {
      console.error('Error deleting post:', error);
      alert('게시글 삭제에 실패했습니다.');
      return;
    }

    setIsDeleteOpen(false);
    setSelectedPost(null);
    fetchPosts();
  };

  const handleTogglePin = async (id: string, currentIsPinned: boolean) => {
    const { error } = await supabase
      .from('posts')
      .update({ is_pinned: !currentIsPinned })
      .eq('id', id);

    if (error) {
      console.error('Error toggling pin:', error);
      return;
    }

    fetchPosts();
  };

  const openEditDialog = (row: PostRow) => {
    setSelectedPost(row);
    setFormTitle(row.title);
    setFormContent(row.content);
    setFormIsPinned(row.isPinned);
    setIsEditOpen(true);
  };

  const postSortOptions: SortOption[] = [
    { key: 'title', label: '제목' },
    { key: 'createdAt', label: '작성일' },
    { key: 'views', label: '조회수' },
  ];

  const renderPostCard = (row: PostRow) => (
    <div className="rounded-lg border border-border bg-card p-4 space-y-2">
      <div className="flex items-center gap-2">
        {row.isPinned && <Pin className="h-4 w-4 shrink-0 text-gold-500" />}
        <p className="font-medium text-foreground truncate">{row.title}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {row.createdAt} · 조회 {row.views.toLocaleString()}
        </p>
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
            <DropdownMenuItem onClick={() => handleTogglePin(row.id, row.isPinned)}>
              {row.isPinned ? (
                <><PinOff className="mr-2 h-4 w-4" />고정 해제</>
              ) : (
                <><Pin className="mr-2 h-4 w-4" />상단 고정</>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openEditDialog(row)}>
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => { setSelectedPost(row); setIsDeleteOpen(true); }}
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

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
          <span className="font-medium text-foreground truncate">{row.title}</span>
        </div>
      ),
    },
    {
      key: 'author',
      header: '작성자',
      cell: (row) => <span className="text-foreground">{row.author}</span>,
    },
    {
      key: 'createdAt',
      header: '작성일',
      sortable: true,
      cell: (row) => <span className="text-foreground">{row.createdAt}</span>,
    },
    {
      key: 'views',
      header: '조회수',
      sortable: true,
      cell: (row) => <span className="text-foreground">{row.views.toLocaleString()}</span>,
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
            <DropdownMenuItem onClick={() => handleTogglePin(row.id, row.isPinned)}>
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
            <DropdownMenuItem onClick={() => openEditDialog(row)}>
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">게시판 관리</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            공지사항을 관리합니다.
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
          공지사항 작성
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={posts}
        columns={noticeColumns}
        searchKey="title"
        searchPlaceholder="제목으로 검색..."
        pageSize={10}
        renderMobileCard={renderPostCard}
        mobileSortOptions={postSortOptions}
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>공지사항 작성</DialogTitle>
            <DialogDescription>
              새로운 공지사항을 작성하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                placeholder="제목을 입력하세요"
                className=""
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                placeholder="내용을 입력하세요."
                rows={10}
                className=""
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPinned"
                className="h-4 w-4"
                checked={formIsPinned}
                onChange={(e) => setFormIsPinned(e.target.checked)}
              />
              <Label htmlFor="isPinned" className="font-normal">
                상단에 고정
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              취소
            </Button>
            <Button
              onClick={handleCreate}
              disabled={saving || !formTitle.trim() || !formContent.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
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
                className=""
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-content">내용</Label>
              <Textarea
                id="edit-content"
                placeholder="내용을 입력하세요."
                rows={10}
                className=""
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="edit-isPinned"
                className="h-4 w-4"
                checked={formIsPinned}
                onChange={(e) => setFormIsPinned(e.target.checked)}
              />
              <Label htmlFor="edit-isPinned" className="font-normal">
                상단에 고정
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              취소
            </Button>
            <Button
              onClick={handleEdit}
              disabled={saving || !formTitle.trim() || !formContent.trim()}
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
            <DialogTitle>게시글 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 게시글을 삭제하시겠습니까?
              <br />
              <span className="font-medium text-foreground">&quot;{selectedPost?.title}&quot;</span>
              <br />
              이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
